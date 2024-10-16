import { loginDto } from "../dto/userLogin.dto";
import { usersDto } from "../dto/userRegister.dto";
import { authService } from "../services/auth.services";
import catchAsync from "../utils/catchAsync.utils";
import { Request, Response } from "express";

const postUser = async (req: Request, res: Response) => {
  const userData: usersDto = req.body;
  const createUser = await authService.createUser(userData);
  res.status(201).json(createUser);
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password }: loginDto = req.body;
  const token = await authService.loginUser(email, password);
  res.status(200).json(token);
};

export default {
  postUser: catchAsync(postUser),
  loginUser: catchAsync(loginUser),
};
