/* global BigInt */
import { RequestPaymentTransaction } from '@moosty/lisk-recurring-payment';
import { config } from "../config/config";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";
import { getNonce } from "./helpers/nonce";
import { getUnit } from "./helpers/unit";

export const doRequest = async (passphrase, data, api) => {
  const {publicKey} = getAddressAndPublicKeyFromPassphrase(passphrase);
  const nonce = await getNonce(publicKey);
  const unit = await getUnit(data.contractPublicKey);
  const tx = new RequestPaymentTransaction({
    nonce: nonce.toString(),
    senderPublicKey: publicKey,
    asset: {
      ...data,
      unit,
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
          message: "Send payment request transaction",
          description: "Payment request transaction accepted",
          placement: "topRight",
          duration: 10
        })
      }
      if (data.errors) {
        data.errors.map(error => {
          console.log(error)
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
