import {
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  Column,
} from 'sequelize-typescript';
import { Admin } from '../../admin/entities/admin.entity';
import { Status } from '../../status/entities/status.entity';
import { Order } from '../../order/entities/order.entity';

interface operationAttrs {
  id: number;
  order_unique_id: number;
  status_id: number;
  operation_date: Date;
  admin_id: number;
  description: string;
}
@Table({ tableName: 'operation' })
export class Operation extends Model<operationAttrs, Operation> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  order_unique_id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  order_id: number;
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
  })
  admin_id: number;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @BelongsTo(() => Status)
  status: Status;
  @BelongsTo(() => Admin)
  admin: Admin;
}
