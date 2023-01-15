import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TransactionData {
  @ApiProperty({
    description: 'Id of the webhook',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Amount of payment',
    example: -500,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Id of categories',
    example: [1, 2],
  })
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @ApiProperty({
    description: 'Id of bank',
    example: 1,
  })
  @IsNumber()
  bankId: number;
}
