/* global BigInt */
import { CreateContractTransaction } from '@moosty/lisk-recurring-payment';
import { config } from "../config/config";
import { utils } from "@liskhq/lisk-transactions";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";
import { getNonce } from "./helpers/nonce";

const { convertLSKToBeddows } = utils;

export const doCreate = async (passphrase, data, api, setClose, cancel, cb) => {
  const {publicKey} = getAddressAndPublicKeyFromPassphrase(passphrase);
  const nonce = await getNonce(publicKey);
  const tx = new CreateContractTransaction({
    nonce: nonce.toString(),
    senderPublicKey: publicKey,
    asset: {
      title: data.title,
      unit: {
        type: data.unitType,
        typeAmount: data.unitAmount,
        amount: convertLSKToBeddows(data.amount.toString()),
        prepaid: data.prepaid,
        total: data.duration,
        terminateFee: data.terminationFee,
      },
      recipientPublicKey: data.recipient,
      senderPublicKey: data.sender,
      timestamp: parseInt(new Date().getTime() / 1000),
      data: data.data,
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
          message: "Send transaction",
          description: "Create transaction accepted",
          placement: "topRight",
          duration: 10
        })
        setClose(false);
        cb(true);
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
        cb(false, data.errors);
        setClose(true);
      }
    })
}
