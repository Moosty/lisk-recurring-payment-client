import { useState, useEffect } from 'react';
import { getAddressAndPublicKeyFromPassphrase } from '@liskhq/lisk-cryptography';
import { config } from "../config/config";

export const useCheckName = (name, passphrase, setName) => {
  const [exist, setExist] = useState(false);
  const [canLogin, setCanLogin] = useState(false);

  useEffect(() => {
    if (passphrase) {
      const {publicKey} = getAddressAndPublicKeyFromPassphrase(passphrase);
      fetch(`${config.node}accounts?publicKey=${publicKey}`)
        .then(result => result.json())
        .then(data => {
          if (data.data && data.data.length > 0) {
            if (data.data[0].username !== "") {
              setName(data.data[0].username);
              setExist(true);
              setCanLogin(true);
            } else {
              if (name && !exist) {
                setCanLogin(true);
              } else {
                setCanLogin(false);
              }
            }
          } else {
            if (name && !exist) {
              setCanLogin(true);
            } else {
              setCanLogin(false);
            }
          }
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      setCanLogin(false);
    }
  }, [passphrase]);

  useEffect(() => {
    if (name) {
      const {publicKey} = getAddressAndPublicKeyFromPassphrase(passphrase);
      fetch(`${config.node}accounts?username=${name}`)
        .then(result => result.json())
        .then(data => {
          if (data.data && data.data.length > 0) {
            if (data.data[0].username === name && data.data[0].publicKey === publicKey) {
              setExist(true);
              setCanLogin(true);
            } else {
              setExist(true);
              setCanLogin(false);
            }
          } else {
            if (passphrase) {
              setCanLogin(true);
            }
            setExist(false);
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      setExist(false);
      setCanLogin(false);
    }
  }, [name]);

  return [
    exist,
    canLogin,
  ]
}
