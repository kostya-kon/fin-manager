import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Bank, Category, Transaction, Webhook } from 'src/database/models';
import { TransactionCategory } from 'src/database/models/transaction-category.model';
import { TransactionType } from 'src/shared/enums/transactionType';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
    @InjectModel(TransactionCategory)
    private readonly transactionCategoryModel: typeof TransactionCategory,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
    @InjectModel(Bank)
    private readonly bankModel: typeof Bank,
    @InjectModel(Webhook)
    private readonly webhookModel: typeof Webhook,
    private readonly sequelize: Sequelize,
    private readonly httpService: HttpService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    let transaction;
    try {
      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        const { categoryIds, bankId, amount } = createTransactionDto;
        const bank = await this.bankModel.findByPk(bankId);
        if (!bank) {
          throw new Error(`Bank with id=${bankId} not found`);
        }
        await bank.update({ balance: bank.balance + amount }, transactionHost);
        const type =
          createTransactionDto.amount > 0
            ? TransactionType.PROFITABLE
            : TransactionType.CONSUMABLE;
        transaction = await this.transactionModel.create(
          {
            ...createTransactionDto,
            type,
          },
          transactionHost,
        );
        const categories = await this.categoryModel.findAll({
          where: { id: categoryIds },
        });
        if (categories) {
          for (const category of categories) {
            await this.transactionCategoryModel.create(
              {
                transactionId: transaction.id,
                categoryId: category.id,
              },
              transactionHost,
            );
          }
        } else {
          throw new Error(`Categories with ids=${categoryIds} not found`);
        }
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
    const { rows: webhooks, count } = await this.webhookModel.findAndCountAll();
    let webhookData: Transaction;
    if (count > 0) {
      webhookData = await this.transactionModel.findByPk(transaction.id, {
        include: [
          {
            model: Bank,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Category,
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
            through: {
              attributes: [],
            },
          },
        ],
      });
    }
    for (const webhook of webhooks) {
      this.httpService.axiosRef.post(webhook.url, webhookData);
    }
    return transaction;
  }

  async findAll(page = 1, limit = 15) {
    const options: any = {
      offset: page <= 0 ? 0 : (page - 1) * limit,
      limit,
      include: [
        {
          model: Bank,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Category,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          through: {
            attributes: [],
          },
        },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt', 'bankId'] },
    };
    const { rows, count } = await this.transactionModel.findAndCountAll(
      options,
    );
    return {
      all_count: count,
      transactions: rows,
    };
  }

  async remove(id: number) {
    const transaction = await this.transactionModel.findByPk(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with id=${id} not found`);
    }
    return transaction.destroy();
  }
}
