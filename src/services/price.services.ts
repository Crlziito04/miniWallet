import { showPriceBTC_USD } from "../utils/priceBtcUsd.utils";

export const priceServices = {
  priceBTC_USD: async () => {
    return await showPriceBTC_USD();
  },
};
