import catchAsync from "../utils/catchAsync.utils";
import { Request, Response, NextFunction } from "express";

const validateLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw {
      message: "Correo electrónico y contraseña son obligatorios",
      code: 400,
    };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    throw {
      message: "Formato de correo electrónico no válido",
      code: 400,
    };

  next();
};

export default {
  validateLoginData: catchAsync(validateLoginData),
};
