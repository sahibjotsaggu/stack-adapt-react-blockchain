import types from "./types";
import fetcher from "utils/fetcher";
import formatMoney from "utils/formatMoney";
import { getQuote } from "./common";

function setCryptoData(payload) {
  return {
    type: types.GET_CRYPTO_DATA,
    payload
  };
}

function appendCryptoData(page, data) {
  return {
    type: types.APPEND_CRYPTO_DATA,
    payload: {
      page,
      data
    }
  };
}

export function fetchCryptoData(page, initial) {
  return function (dispatch) {
    return fetcher(
      `https://www.stackadapt.com/coinmarketcap/map?sort=cmc_rank&limit=20&start=${page}&aux=is_active`
    ).then((resp) => {
      if (resp.status.error_code === 0) {
        // resp.data is already sorted by cmc rank
        if (initial) {
          let data = resp.data.slice(0, 5);

          // get prices for first 5 symbols
          Promise.all(data.map((symbol) => getQuote(symbol.id))).then(
            (_resp) => {
              let r = _resp;
              let allResolved = true;
              for (let i = 0; i < r.length; i++) {
                if (r[i].status.error_code !== 0) {
                  allResolved = false;
                }
              }

              if (allResolved) {
                r = r.map((quote) => Object.entries(quote.data)[0][1]);

                data = data
                  .map((s, i) => ({
                    ...s,
                    price: formatMoney(r[i]?.quote["USD"].price)
                  }))
                  .concat(resp.data.slice(5));
                dispatch(setCryptoData(data));
              }
            }
          );
        } else {
          // add new symbols to state
          dispatch(appendCryptoData(page, resp.data));
        }
      }
    });
  };
}
