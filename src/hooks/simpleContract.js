import { useState, memo, useEffect } from 'react';
import { config } from "../config/config";

export const useSimpleContract = (publicKey, type) => {

  const [contract, setContractStore] = useState(null);

  useEffect(() => {
    if (publicKey && type > 13001) {
      fetch(`${config.node}accounts?publicKey=${publicKey}`)
        .then(result => result.json())
        .then(data => {
          if (data && data.data && data.data.length === 1) {
            setContractStore(data.data[0]);
          }
        });
    }
  }, [publicKey]);

  return [
    contract
  ];
}
