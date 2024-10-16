import { CoinRes } from "../interfaces/CoinRes.interface";

export const showPriceBTC_USD = async () => {
  try {
    const res = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    const price = (await res.json()) as CoinRes;

    const BTC_USD = price.bpi.USD.rate_float;

    return BTC_USD;
  } catch (err) {
    console.error("Error fetching BTC price:", err);
    throw err;
  }
};

export const priceUSD_BTC = async () => {
  try {
    const price = await showPriceBTC_USD();
    return 1 / price;
  } catch (err) {
    console.error("Error fetching inverse BTC price:", err);
    throw err;
  }
};
