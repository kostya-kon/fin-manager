import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TransactionType } from 'src/shared/enums/transactionType';
import { Bank } from './bank.model';
import { Category } from './category.model';
import { TransactionCategory } from './transaction-category.model';

@Table
export class Transaction extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ allowNull: false, type: DataType.INTEGER })
  amount: number;

  @Column({ allowNull: false, type: DataType.STRING })
  type: TransactionType.PROFITABLE | TransactionType.CONSUMABLE;

  @BelongsToMany(() => Category, () => TransactionCategory)
  categories: Category[];

  @ForeignKey(() => Bank)
  @Column
  bankId: number;

  @BelongsTo(() => Bank)
  bank: Bank;
}
