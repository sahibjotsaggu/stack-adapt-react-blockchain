import types from "actions/types";

export const initialState = {
  cryptoSymbols: [],
  symbolSelection: [],
  page: 1
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CRYPTO_DATA:
      return {
        ...state,
        cryptoSymbols: action.payload.slice(0, 5),
        symbolSelection: action.payload.slice(5)
      };

    case types.REMOVE_CRYPTO_FROM_TABLE:
      return {
        ...state,
        symbolSelection: state.symbolSelection
          .concat([
            state.cryptoSymbols.find(
              (symbol) => symbol.id === action.payload.id
            )
          ])
          .sort((a, b) => a.rank - b.rank),
        cryptoSymbols: state.cryptoSymbols.filter(
          (symbol) => symbol.id !== action.payload.id
        )
      };

    case types.ADD_CRYPTO_TO_TABLE:
      return {
        ...state,
        cryptoSymbols: state.cryptoSymbols
          .concat([
            state.symbolSelection.find(
              (symbol) => symbol.id === action.payload.id
            )
          ])
          .sort((a, b) => a.rank - b.rank),
        symbolSelection: state.symbolSelection.filter(
          (symbol) => symbol.id !== action.payload.id
        )
      };

    case types.SET_CRYPTO_PRICE:
      const symbolIndex = state.cryptoSymbols.findIndex(
        (symbol) => symbol.id === action.payload.id
      );
      const updatedCryptoSymbols = [...state.cryptoSymbols];
      updatedCryptoSymbols[symbolIndex].price = action.payload.price;
      return {
        ...state,
        cryptoSymbols: updatedCryptoSymbols
      };

    case types.APPEND_CRYPTO_DATA: {
      return {
        ...state,
        symbolSelection: [...state.symbolSelection]
          .concat(action.payload.data)
          .sort((a, b) => a.rank - b.rank),
        page: action.payload.page
      };
    }

    default:
      return state;
  }
}
