import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BankData {
  @ApiProperty({
    description: 'Id of the bank',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of bank',
    example: 'MegaBank',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Balance in bank',
    example: 2500,
  })
  @IsOptional()
  @IsNumber()
  balance?: number;
}
