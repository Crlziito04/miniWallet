import { createTransaction } from "../dto/createTransaction.dto";
import { transactionService } from "../services/transaction.services";
import catchAsync from "../utils/catchAsync.utils";
import { Request, Response } from "express";

const getAllTransaction = async (req: Request, res: Response) => {
  const transactions = await transactionService.getAllTransaction();
  res.status(200).json(transactions);
};

const getTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const transaction = await transactionService.getTransactionById(id);
  res.status(200).json(transaction);
};

const createNewTransaction = async (req: Request, res: Response) => {
  const dataTrans: createTransaction = req.body;
  const newTransaction = await transactionService.createTransaction(dataTrans);
  res.status(201).json(newTransaction);
};

export default {
  getAllTransaction: catchAsync(getAllTransaction),
  getTransactionById: catchAsync(getTransactionById),
  createNewTransaction: catchAsync(createNewTransaction),
};
