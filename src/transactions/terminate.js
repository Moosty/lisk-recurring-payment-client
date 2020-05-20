/* global BigInt */
import { TerminateContractTransaction } from '@moosty/lisk-recurring-payment';
import { config } from "../config/config";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";
import { getNonce } from "./helpers/nonce";

export const doTerminate = async (passphrase, data, api) => {
  const {publicKey} = getAddressAndPublicKeyFromPassphrase(passphrase);
  const nonce = await getNonce(publicKey);
  console.log(data)
  const tx = new TerminateContractTransaction({
    nonce: nonce.toString(),
    senderPublicKey: publicKey,
    asset: {
      ...data
    }
  });

  tx.fee = (tx.minFee + BigInt(65000)).toString();
  tx.sign(config.networkIdentifier, passphrase)
  const options = {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(tx.toJSON()),
    method: "POST"
  }
  fetch(`${config.node}transactions`, options)
    .then(result => result.json())
    .then(data => {
      if (data.meta && data.meta.status) {
        api.success({
          message: "Send terminate transaction",
          description: "Terminate transaction accepted",
          placement: "topRight",
          duration: 10
        })
      }
      if (data.errors) {
        data.errors.map(error => {
          api.error({
            message: data.message,
            description: error.message,
            placement: "topRight",
            duration: 10
          })
        })
      }
    })
}
