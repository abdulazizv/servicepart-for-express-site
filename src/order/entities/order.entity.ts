import {
  Table,
  Model,
  DataType,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { CurrencyType } from '../../currency_type/entities/currency_type.entity';

interface orderAttr {
  id:number;
  full_name: string;
  phone_number: string;
  product_link: string;
  summa: number;
  truck: string;
  description: string;
}

@Table({ tableName: 'order' })
export class Order extends Model<orderAttr, Order> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  order_unique_id: string;

  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  product_link: string;

  @Column({
    type: DataType.NUMBER,
  })
  summa: number;

  @Column({
    type: DataType.STRING,
  })
  truck: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @ForeignKey(() => CurrencyType)
  @Column({
    type: DataType.NUMBER,
  })
  currency_type_id: number;

  @BelongsTo(() => CurrencyType)
  currencyType: CurrencyType;
}
