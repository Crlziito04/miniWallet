import { typeTransaction } from "../models/transaction.model";

export enum currencyType {
  USD = "USD",
  BTC = "BTC",
}

export class createTransaction {
  amount: number;
  currency: currencyType;
  userId: string;
}

export class CreateTransactionDTO {
  amountBTC!: number;
  amountUSD!: number;
  transactionType!: typeTransaction;
  userId!: string;
}
