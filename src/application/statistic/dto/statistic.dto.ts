import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class StatisticDto {
  @ApiProperty({
    description: 'Id of categories',
    example: [1, 2],
  })
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @ApiProperty({
    description: 'Date from',
    example: '2023-01-14T10:24:00.000Z',
  })
  @IsDateString()
  fromPeriod: Date;

  @ApiProperty({
    description: 'Date to',
    example: '2023-01-14T20:24:00.000Z',
  })
  @IsDateString()
  toPeriod: Date;
}
