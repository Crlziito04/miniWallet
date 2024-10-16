import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { ulid } from "ulid";
import { Credential } from "./credential.model";
import { Transaction } from "./transaction.model";

@Table({
  tableName: "Users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING(26),
    primaryKey: true,
    unique: true,
    defaultValue: () => ulid(),
  })
  id!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  lastname!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: "decimal(15, 2)",
    allowNull: true,
    defaultValue: 0.0,
  })
  usdBalance!: number;

  @Column({
    type: "decimal(20, 8)",
    allowNull: true,
    defaultValue: 0.0,
  })
  btcBalance!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin!: boolean;

  @HasOne(() => Credential)
  credential: Credential;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
