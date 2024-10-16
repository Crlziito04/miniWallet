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

export enum typeTransaction {
  USD_TO_BTC = "USD_TO_BTC",
  BTC_TO_USD = "BTC_TO_USD",
}

@Table({
  tableName: "Transactions",
})
export class Transaction extends Model {
  @Column({
    type: DataType.STRING(26),
    primaryKey: true,
    unique: true,
    defaultValue: () => ulid(),
  })
  id!: string;

  @Column({
    type: DataType.DECIMAL(20, 8),
    allowNull: false,
    defaultValue: 0.0,
  })
  amountBTC!: number;

  @Column({
    type: DataType.DECIMAL(20, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  amountUSD!: number;

  @Column({
    type: DataType.ENUM(typeTransaction.BTC_TO_USD, typeTransaction.USD_TO_BTC),
    allowNull: false,
  })
  transactionType!: typeTransaction;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
