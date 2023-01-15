import { OmitType, PartialType } from '@nestjs/swagger';
import { CategoryData } from '../classes/category-data.class';

export class CreateCategoryDto extends PartialType(
  OmitType(CategoryData, ['id'] as const),
) {}
