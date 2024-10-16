import { userServices } from "../services/user.services";
import catchAsync from "../utils/catchAsync.utils";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await userServices.getAllUsers();
  res.status(200).json(allUsers);
};

export default {
  getAllUsers: catchAsync(getAllUsers),
};
