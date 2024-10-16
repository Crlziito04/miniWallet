import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import priceRouter from "./price.router";
import transactionRouter from "./transaction.router";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/price", priceRouter);
indexRouter.use("/transaction", transactionRouter);

export default indexRouter;
