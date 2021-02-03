import React from "react";
import { useSelector, useDispatch } from "react-redux";

import types from "actions/types";

const CryptoTable = () => {
  const cryptoSymbols = useSelector((state) => state.cryptoSymbols);
  const dispatch = useDispatch();

  return (
    <>
      {!cryptoSymbols.length && "Loading..."}
      {!!cryptoSymbols.length && (
        <table>
          <thead>
            <tr>
              <th>CMC Rank</th>
              <th>Symbol</th>
              <th>Name</th>
              <th style={{ width: 100 }}>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cryptoSymbols.map((crypto) => (
              <tr key={crypto.slug}>
                <td>{crypto.rank}</td>
                <td>{crypto.symbol}</td>
                <td>{crypto.name}</td>
                <td>{crypto.price || "Fetching..."}</td>
                <td>
                  <button
                    disabled={cryptoSymbols.length === 1}
                    onClick={() =>
                      dispatch({
                        type: types.REMOVE_CRYPTO_FROM_TABLE,
                        payload: { id: crypto.id }
                      })
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CryptoTable;
