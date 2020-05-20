import { useState, useRef, useEffect } from 'react';
import { config } from "../config/config";
import BigNum from "@liskhq/bignum";

export const useContract = (setBalance, setNonce) => {

  const [contract, setContractStore] = useState({publicKey: ""});
  const [timer, setTimer] = useState(null);
  const contractRef = useRef(contract);
  contractRef.current = contract;
  const timerRef = useRef(timer);
  timerRef.current = timer;

  const setContract = (props) => {
    if (props.publicKey) {
      setContractStore({...contractRef.current, publicKey: props.publicKey});
      loadContract(props);
    } else {
      setContractStore({publicKey: ""});
    }
  }

  const loadContract = (props) => {
    console.log("Load contract...")
    if ((props && props.publicKey) || (contractRef.current.publicKey)) {
      fetch(`${config.node}accounts?publicKey=${contractRef.current.publicKey || props.publicKey}`)
        .then(result => result.json())
        .then(data => {
          if (data && data.data && data.data.length === 1) {
            setBalance(new BigNum(data.data[0].balance));
            setContractStore(data.data[0]);
          }
          setTimer(setTimeout(() => {
            loadContract(contractRef.current);
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
    contract, setContract
  ]
}
