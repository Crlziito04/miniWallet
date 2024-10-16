import { Router } from "express";
import userController from "../controller/user.controller";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);

export default userRouter;
