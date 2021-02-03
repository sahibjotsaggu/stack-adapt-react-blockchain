import React from "react";
import { useSelector, useDispatch } from "react-redux";

import types from "actions/types";
import { fetchCryptoQuote } from "actions/getCryptoQuote";
import { fetchCryptoData } from "actions/getCryptoData";

const CryptoSelector = () => {
  const symbolSelection = useSelector((state) => state.symbolSelection);
  const cryptoSymbols = useSelector((state) => state.cryptoSymbols);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const handleCryptoSelection = (e) => {
    const id = Number(e.target.value);
    dispatch({
      type: types.ADD_CRYPTO_TO_TABLE,
      payload: { id }
    });

    // only get the quote if it wasn't fetched before
    if (!symbolSelection.find((symbol) => symbol.id === id).price) {
      dispatch(fetchCryptoQuote(id));
    }
  };

  const fetchMoreCrypto = () => {
    dispatch(fetchCryptoData(page + 20, false));
  };

  return (
    <>
      {cryptoSymbols.length === 10 ? (
        <span>Remove symbols from the table to add more.</span>
      ) : (
        <span>Choose from {symbolSelection.length} symbols:</span>
      )}{" "}
      <select
        disabled={!symbolSelection.length || cryptoSymbols.length === 10}
        onChange={handleCryptoSelection}
      >
        {!symbolSelection.length ? (
          <option>Loading...</option>
        ) : (
          <option>Add more symbols</option>
        )}

        {symbolSelection.length &&
          symbolSelection.map((symbol) => (
            <option
              key={symbol.slug}
              value={symbol.id}
              data-price={symbol.price}
            >
              #{symbol.rank}: {symbol.name}
            </option>
          ))}
      </select>{" "}
      <button onClick={fetchMoreCrypto}>Fetch more cryptocurrencies</button>
    </>
  );
};

export default CryptoSelector;
