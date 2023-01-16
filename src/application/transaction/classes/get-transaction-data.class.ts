import { ApiProperty } from '@nestjs/swagger';
import { TransactionData } from './transaction-data.class';

export class GetTransactionData {
  @ApiProperty({
    description: 'All count of transactions',
    example: 1,
  })
  all_count: number;

  @ApiProperty({
    description: 'List of filtered conversation',
    type: TransactionData,
    isArray: true,
  })
  payload: Array<TransactionData>;
}
