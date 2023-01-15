import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, Transaction } from 'src/database/models';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Category, Transaction])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
