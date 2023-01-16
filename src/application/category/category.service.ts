import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category, Transaction } from 'src/database/models';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create({ ...createCategoryDto });
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!category) {
      throw new NotFoundException(`Category with id=${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category with id=${id} not found`);
    }
    return category.update(updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category with id=${id} not found`);
    }
    if (
      (await this.transactionModel.count({
        where: { categoryIds: [category.id] },
      })) === 0
    ) {
      return category.destroy();
    }
  }
}
