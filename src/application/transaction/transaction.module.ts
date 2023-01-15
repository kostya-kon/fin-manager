import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import {
  Bank,
  Category,
  Transaction,
  TransactionCategory,
  Webhook,
} from 'src/database/models';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Transaction,
      TransactionCategory,
      Category,
      Bank,
      Webhook,
    ]),
    HttpModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
