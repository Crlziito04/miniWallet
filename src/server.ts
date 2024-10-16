import express, { NextFunction, Request, Response } from "express";
import morgan = require("morgan");
import cors from "cors";
import IError from "./interfaces/error.interface";
import indexRouter from "./routes/index.router";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(indexRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  if (err.code) {
    res.status(err.code).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
