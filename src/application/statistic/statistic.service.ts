import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Category, Transaction } from 'src/database/models';
import { StatisticDto } from './dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}
  async getStats(statisticDto: StatisticDto) {
    const { categoryIds, fromPeriod, toPeriod } = statisticDto;
    const categories = await this.categoryModel.findAll({
      where: { id: categoryIds },
      attributes: {
        include: [
          [
            Sequelize.fn('SUM', Sequelize.col('transactions.amount')),
            'balance',
          ],
        ],
      },
      include: {
        model: Transaction,
        attributes: [],
        through: {
          attributes: [],
        },
        where: { updatedAt: { [Op.between]: [fromPeriod, toPeriod] } },
      },
      group: ['Category.id'],
    });
    if (!categories) {
      throw new NotFoundException(
        `Categories with ids=${categoryIds} not found`,
      );
    }
    const stat = {};
    for (const category of categories) {
      stat[category.name] = category.getDataValue('balance');
    }
    console.log(stat);
    return stat;
  }
}
