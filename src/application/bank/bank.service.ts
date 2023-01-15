import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'src/database/models';
import { Bank } from 'src/database/models/bank.model';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectModel(Bank)
    private bankModel: typeof Bank,
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}
  create(createBankDto: CreateBankDto) {
    createBankDto.balance = createBankDto.balance || 0;
    return this.bankModel.create({ ...createBankDto });
  }

  findAll() {
    return this.bankModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async findOne(id: number) {
    const bank = await this.bankModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!bank) {
      throw new NotFoundException(`bank with id=${id} not found`);
    }
    return bank;
  }

  async update(id: number, updateBankDto: UpdateBankDto) {
    const bank = await this.bankModel.findByPk(id);
    if (!bank) {
      throw new NotFoundException(`bank with id=${id} not found`);
    }
    return bank.update(updateBankDto);
  }

  async remove(id: number) {
    const bank = await this.bankModel.findByPk(id);
    if (!bank) {
      throw new NotFoundException(`bank with id=${id} not found`);
    }
    if (
      (await this.transactionModel.count({ where: { bankId: bank.id } })) === 0
    ) {
      return bank.destroy();
    } else {
      throw new BadRequestException(
        `Cannot delete bank id=${id}, because it has transactions`,
      );
    }
  }
}
