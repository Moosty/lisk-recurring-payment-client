import { useState, useRef, useEffect } from 'react';
import { config } from "../config/config";

export const useAccount = (publicKey) => {

  const [account, setAccount] = useState({publicKey: publicKey});

  const loadAccount = () => {
    if (publicKey) {
      fetch(`${config.node}accounts?publicKey=${publicKey}`)
        .then(result => result.json())
        .then(data => {
          if (data && data.data && data.data.length === 1) {;
            setAccount(data.data[0]);
          }
        })
    }
  }

  useEffect(() => {
    if (publicKey) {
      loadAccount()
    }
  }, [publicKey])

  return account;
}
