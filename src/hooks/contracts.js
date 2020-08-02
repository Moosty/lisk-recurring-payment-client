import { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { config } from "../config/config";

export const useContracts = () => {
  const [account, setAccount] = useState({loggedIn: false, publicKey: ""});
  const [contracts, setContracts] = useState([]);
  const [timer, setTimer] = useState(null);
  const accountRef = useRef(account);
  const contractsRef = useRef(contracts);
  const timerRef = useRef(timer);
  accountRef.current = account;
  contractsRef.current = contracts;
  timerRef.current = timer;

  const activateContracts = (props) => {
    if (props.loggedIn) {
      setAccount({...account, loggedIn: true, publicKey: props.publicKey});
      loadContracts(props);
    } else {
      setAccount({...account, loggedIn: false, publicKey: ""});
    }
  }

  const loadContracts = (props) => {
    console.log("load contracts...")
    if ((props && props.loggedIn && props.publicKey) || (accountRef.current.loggedIn && accountRef.current.publicKey)) {
      fetch(`${config.extendedNode}contracts/${accountRef.current.publicKey || props.publicKey}`)
        .then(result => result.json())
        .then(data => {
            if (data && data.length > 0) {
              data.map(async contract => {
                if (_.findIndex(contractsRef.current, {publicKey: contract.publicKey}) === -1) {
                  setContracts([contract, ...contractsRef.current]);
                }
              });
            }
            setTimer(setTimeout(() => {
              loadContracts();
            }, config.refreshInterval));
          }
        )
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    }
  }, [])

  return [
    contracts, activateContracts
  ]
}
