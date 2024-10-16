import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ulid } from "ulid";
import { User } from "./user.model";

@Table({
  tableName: "Credentials",
})
export class Credential extends Model {
  @Column({
    type: DataType.STRING(26),
    primaryKey: true,
    unique: true,
    defaultValue: () => ulid(),
  })
  id!: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
    unique: true,
  })
  password!: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
