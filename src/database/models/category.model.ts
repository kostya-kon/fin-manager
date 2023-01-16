import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { TransactionCategory } from './transaction-category.model';
import { Transaction } from './transaction.model';

@Table
export class Category extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id?: number;

  @Column({ allowNull: false, type: DataType.STRING })
  name?: string;

  @BelongsToMany(() => Transaction, () => TransactionCategory)
  transactions: Transaction[];
}
