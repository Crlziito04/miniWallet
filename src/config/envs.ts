import dotenv from "dotenv";
dotenv.config();

export const DB_HOST = process.env.DB_HOST as string;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USER = process.env.DB_USER as string;
export const DB_PASSWORD = process.env.DB_PASSWORD as string;
export const DB_NAME = process.env.DB_NAME as string;

export const APP_PORT = process.env.APP_PORT;

export const JWT_SECRET = process.env.JWT_SECRET as string;
