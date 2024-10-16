import { priceServices } from "../services/price.services";
import catchAsync from "../utils/catchAsync.utils";
import { Request, Response } from "express";

const showPrice = async (req: Request, res: Response) => {
  const price = await priceServices.priceBTC_USD();
  res.status(200).json(price);
};

export default {
  showPrice: catchAsync(showPrice),
};
