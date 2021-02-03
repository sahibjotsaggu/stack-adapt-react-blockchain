import fetcher from "utils/fetcher";

export function getQuote(id) {
  return fetcher(
    `https://www.stackadapt.com/coinmarketcap/quotes?id=${id}&aux=cmc_rank`
  );
}
