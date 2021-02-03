import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCryptoData } from "actions/getCryptoData";
import CryptoSelector from "./CryptoSelector";
import CryptoTable from "./CryptoTable";

const Crypto = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchCryptoData(1, true));
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <CryptoSelector />
      <CryptoTable />
    </div>
  );
};

export default Crypto;
