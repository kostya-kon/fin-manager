import { OmitType, PartialType } from '@nestjs/swagger';
import { TransactionData } from '../classes/transaction-data.class';

export class CreateTransactionDto extends PartialType(
  OmitType(TransactionData, ['id'] as const),
) {}
