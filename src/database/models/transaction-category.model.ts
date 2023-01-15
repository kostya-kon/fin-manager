import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.model';
import { Transaction } from './transaction.model';

@Table
export class TransactionCategory extends Model {
  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @ForeignKey(() => Transaction)
  @Column
  transactionId: number;
}
