import { Table, Model, DataType, Column } from 'sequelize-typescript';

interface statusAttr {
  id: number;
  name: string;
  description: string;
}
@Table({ tableName: 'status' })
export class Status extends Model<statusAttr, Status> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;
}
