import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category, Transaction } from 'src/database/models';

@Module({
  imports: [SequelizeModule.forFeature([Category, Transaction])],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
