import { OmitType, PartialType } from '@nestjs/swagger';
import { BankData } from '../classes/bank-data.class';

export class CreateBankDto extends PartialType(
  OmitType(BankData, ['id'] as const),
) {}
