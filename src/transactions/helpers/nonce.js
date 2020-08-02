import { config } from "../../config/config";

export const getNonce = async (publicKey) => {
  const account = await fetch(`${config.node}accounts?publicKey=${publicKey}`);
  const data = await account.json();
  if (data && data.data && data.data[0] && data.data[0].nonce) {
    return data.data[0].nonce;
  } else {
    return '0';
  }
}
