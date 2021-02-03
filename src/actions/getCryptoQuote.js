import types from "./types";
import formatMoney from "utils/formatMoney";
import { getQuote } from "./common";

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
    return getQuote(id).then((resp) => {
      if (resp.status.error_code === 0) {
        const price = formatMoney(
          Object.entries(resp.data)[0][1]?.quote["USD"].price
        );
        dispatch(setCryptoPrice(id, price));
      }
    });
  };
}
