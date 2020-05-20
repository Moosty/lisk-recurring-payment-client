import { useState, useEffect } from 'react';
import { config } from "../config/config";

export const useContractTransactions = (publicKey) => {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`${config.extendedNode}transactions/${publicKey}`)
        .then(result => result.json())
        .then(data => {
          if (data && data && data.length > 0) {
            setTransactions(data);
          }
        });
    }
  }, [publicKey]);

  return [
    transactions
  ];
}
