import { client } from '@moosty/lisk-sprinkler';
import { config } from "../config/config";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";

export const doSprinkler = (passphrase, username) => {
  const {publicKey} = getAddressAndPublicKeyFromPassphrase(passphrase);
  const tx = client.sprinkler({
    username: username.toLowerCase(),
    publicKey,
    networkIdentifier: config.networkIdentifier,
    nonce: '0',
    fee: '1000000',
    passphrase
  });

  const options = {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(tx),
    method: "POST"
  }

  fetch(`${config.node}transactions`, options)
    .then(result => result.json())
    .then(data => {
      console.log(data)
    })
}
