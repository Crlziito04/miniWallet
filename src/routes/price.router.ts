import { Router } from "express";
import priceController from "../controller/price.controller";

const priceRouter = Router();

priceRouter.get("/", priceController.showPrice);

export default priceRouter;
