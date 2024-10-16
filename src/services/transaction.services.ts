import { transactionRepository, userRepository } from "../config/config.mySql";
import {
  createTransaction,
  CreateTransactionDTO,
  currencyType,
} from "../dto/createTransaction.dto";
import { typeTransaction } from "../models/transaction.model";
import { priceUSD_BTC, showPriceBTC_USD } from "../utils/priceBtcUsd.utils";

export const transactionService = {
  getAllTransaction: async () => {
    try {
      return await transactionRepository.findAll({
        include: [userRepository],
      });
    } catch (error) {
      throw error;
    }
  },
  getTransactionById: async (id: string) => {
    try {
      const transaction = await transactionRepository.findOne({
        where: { id },
        include: [userRepository],
      });
      if (!transaction) {
        throw {
          message: "Transaction not found",
          code: 401,
        };
      }
      return transaction;
    } catch (error) {
      throw error;
    }
  },
  createTransaction: async (dataTransaction: createTransaction) => {
    const user = await userRepository.findOne({
      where: { id: dataTransaction.userId },
      include: [transactionRepository],
    });

    if (!user) {
      throw {
        message: "User not found",
        code: 401,
      };
    }

    if (dataTransaction.currency === currencyType.USD) {
      if (dataTransaction.amount > user.usdBalance) {
        throw {
          message: "Not enough funds available",
          code: 400,
        };
      }
      console.log("cambiar de usd a btc");

      const btc = await showPriceBTC_USD();
      const priceInBtc = dataTransaction.amount / btc;

      const transaction: CreateTransactionDTO = {
        userId: user.id,
        transactionType: typeTransaction.USD_TO_BTC,
        amountBTC: priceInBtc,
        amountUSD: dataTransaction.amount,
      };

      await userRepository.update(
        {
          usdBalance: user.usdBalance - transaction.amountUSD,
          btcBalance: user.btcBalance + transaction.amountBTC,
        },
        { where: { id: user.id } }
      );

      await transactionRepository.create({
        ...transaction,
      });
    }

    if (dataTransaction.currency === currencyType.BTC) {
      if (dataTransaction.amount > user.btcBalance) {
        throw {
          message: "Not enough amount available",
          code: 400,
        };
      }
      console.log("cambiar de btc a usd");

      const usd = await priceUSD_BTC();
      const priceInUSD = dataTransaction.amount * usd;

      const transaction: CreateTransactionDTO = {
        userId: user.id,
        transactionType: typeTransaction.BTC_TO_USD,
        amountBTC: priceInUSD,
        amountUSD: dataTransaction.amount,
      };

      await userRepository.update(
        {
          usdBalance: user.usdBalance + transaction.amountUSD,
          btcBalance: user.btcBalance - transaction.amountBTC,
        },
        { where: { id: user.id } }
      );

      await transactionRepository.create({
        ...transaction,
      });
    }
    return "Transaction created successfully";
  },
};
