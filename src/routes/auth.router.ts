import { Router } from "express";
import authController from "../controller/auth.controller";
import validateRegisterMiddleware from "../middlewares/validateRegister.middleware";
import ValidateLoginMiddleware from "../middlewares/ValidateLogin.middleware";

const authRouter = Router();

authRouter.post(
  "/register",
  validateRegisterMiddleware.validateRegisterData,
  authController.postUser
);

authRouter.post(
  "/login",
  ValidateLoginMiddleware.validateLoginData,
  authController.loginUser
);

export default authRouter;
