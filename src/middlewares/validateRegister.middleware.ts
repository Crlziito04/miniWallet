import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync.utils";

const validateRegisterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, confirmPassword } = req.body;
  if (!confirmPassword || !email || !password)
    throw {
      message:
        "password, correo electrónico, confirmPassword y confirmación de contraseña son obligatorios",
      code: 400,
    };

  if (password !== confirmPassword) {
    throw {
      message: "Please confirme your password",
      code: 400,
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    throw {
      message: "Formato de correo electrónico no válido",
      code: 400,
    };

  next();
};

export default {
  validateRegisterData: catchAsync(validateRegisterData),
};
