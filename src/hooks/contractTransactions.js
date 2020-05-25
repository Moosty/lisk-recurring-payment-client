import { useState, useEffect } from 'react';
import { config } from "../config/config";

export const useContractTransactions = (publicKey) => {

  const [transactions, setTransactions] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (publicKey) {
      fetch(`${config.extendedNode}transactions/${publicKey}`)
        .then(result => result.json())
        .then(data => {
          if (data && data && data.length > 0) {
            setTransactions(data);
          }
          setTimeout(() => {
            setUpdate(!update);
          }, config.refreshInterval)
        });
    }
  }, [publicKey, update]);

  return [
    transactions
  ];
}
