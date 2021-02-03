import types from "./types";
import fetcher from "utils/fetcher";
import formatMoney from "utils/formatMoney";

function setCryptoPrice(id, price) {
  return {
    type: types.SET_CRYPTO_PRICE,
    payload: {
      id,
      price
    }
  };
}

export function fetchCryptoQuote(id) {
  return function (dispatch) {
    return fetcher(
      `https://www.stackadapt.com/coinmarketcap/quotes?id=${id}&aux=cmc_rank`
    ).then((resp) => {
      if (resp.status.error_code === 0) {
        const price = formatMoney(
          Object.entries(resp.data)[0][1]?.quote["USD"].price
        );
        dispatch(setCryptoPrice(id, price));
      }
    });
  };
}
