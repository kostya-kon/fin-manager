import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryData {
  @ApiProperty({
    description: 'Id of the category',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'The name of the category',
    example: 'products',
  })
  @IsString()
  name: string;
}
