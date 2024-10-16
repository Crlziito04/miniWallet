import { Sequelize } from "sequelize-typescript";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";
import { User } from "../models/user.model";
import { Credential } from "../models/credential.model";
import { Transaction } from "../models/transaction.model";

export const sequelize = new Sequelize({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  dialect: "mysql",
  username: DB_USER,
  password: DB_PASSWORD,
  models: [User, Credential, Transaction],
  repositoryMode: true,
});

export const userRepository = sequelize.getRepository(User);
export const credentialRepository = sequelize.getRepository(Credential);
export const transactionRepository = sequelize.getRepository(Transaction);
