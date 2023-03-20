import { Model, Table, DataType, Column } from 'sequelize-typescript';

interface currencyAttr {
  id:number;
  name: string;
  description: string;
}

@Table({ tableName: 'currency' })
export class CurrencyType extends Model<currencyAttr, CurrencyType> {
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
