import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { Bank, Transaction } from 'src/database/models';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Bank, Transaction])],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
