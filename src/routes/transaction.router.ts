import { Router } from "express";
import transactionController from "../controller/transaction.controller";

const transactionRouter = Router();

transactionRouter.get("/", transactionController.getAllTransaction);
transactionRouter.get("/:id", transactionController.getTransactionById);
transactionRouter.post("/new", transactionController.createNewTransaction);

export default transactionRouter;
