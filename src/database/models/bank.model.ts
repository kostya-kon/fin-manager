import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Transaction } from './transaction.model';

@Table
export class Bank extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, type: DataType.FLOAT })
  balance: number;

  @HasMany(() => Transaction)
  transaction: Transaction[];
}
