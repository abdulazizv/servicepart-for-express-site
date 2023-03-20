import { Model, Table, Column, DataType } from 'sequelize-typescript';

interface adminAttr {
  full_name: string;
  user_name: string;
  hashed_password: string;
  phone_number: string;
  email: string;
  tg_link: string;
  hashed_token: string;
  is_active: boolean;
  is_creator: boolean;
  description: string;
}
@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, adminAttr> {
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
  full_name: string;

  @Column({
    type: DataType.STRING,
  })
  user_name: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_token: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_creator: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @Column({
    type: DataType.TEXT,
  })
  description: string;
}
