import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Webhook extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  url: string;
}
