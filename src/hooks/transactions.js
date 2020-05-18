import { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { config } from "../config/config";

export const useTransactions = () => {
  const [account, setAccount] = useState({loggedIn: false, publicKey: ""});
  const [transactions, setTransactions] = useState([]);
  const [timer, setTimer] = useState(null);
  const accountRef = useRef(account);
  const transactionsRef = useRef(transactions);
  const timerRef = useRef(timer);
  accountRef.current = account;
  transactionsRef.current = transactions;
  timerRef.current = timer;

  const activateTransactions = (props) => {
    if (props.loggedIn) {
      setAccount({...account, loggedIn: true, publicKey: props.publicKey});
      loadTransactions(props);
    } else {
      setAccount({...account, loggedIn: false, publicKey: ""});
    }
  }

  const loadTransactions = (props) => {
    console.log("load transactions...")
    if ((props && props.loggedIn && props.publicKey) || (accountRef.current.loggedIn && accountRef.current.publicKey)) {
      fetch(`${config.node}transactions?senderPublicKey=${accountRef.current.publicKey || props.publicKey}`)
        .then(result => result.json())
        .then(data => {
          if (data && data.data && data.data.length > 0) {
            data.data.map(tx => {
              if (transactionsRef.current.length > 0 && _.findIndex(transactionsRef.current, {id: tx.id}) === -1) {
                setTransactions([...data.data, tx]);
              } else {
                setTransactions(data.data);
              }
            })
          }
          setTimer(setTimeout(() => {
            loadTransactions();
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
    transactions, activateTransactions
  ]
}
