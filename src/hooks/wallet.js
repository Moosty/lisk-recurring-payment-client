import { useState, useRef, useEffect } from 'react';
import { config } from "../config/config";
import BigNum from "@liskhq/bignum";

export const useWallet = (setBalance, setNonce) => {

  const [account, setAccount] = useState({loggedIn: false, publicKey: ""});
  const [timer, setTimer] = useState(null);
  const accountRef = useRef(account);
  accountRef.current = account;
  const timerRef = useRef(timer);
  timerRef.current = timer;

  const setWallet = (props) => {
    if (props.loggedIn) {
      setAccount({...account, loggedIn: true, publicKey: props.publicKey});
      loadWallet(props);
    } else {
      setAccount({...account, loggedIn: false, publicKey: ""});
    }
  }

  const loadWallet = (props) => {
    console.log("load wallet...")
    if ((props && props.loggedIn && props.publicKey) || (accountRef.current.loggedIn && accountRef.current.publicKey)) {
      fetch(`${config.node}accounts?publicKey=${accountRef.current.publicKey || props.publicKey}`)
        .then(result => result.json())
        .then(data => {
          if (data && data.data && data.data.length === 1) {
            setBalance(new BigNum(data.data[0].balance));
            setNonce(new BigNum(data.data[0].nonce));
          }
          setTimer(setTimeout(() => {
            loadWallet(accountRef.current);
          }, config.refreshInterval));
        })
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    }
  }, [])

  return [
    account, setWallet
  ]
}
