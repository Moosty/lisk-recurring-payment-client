import { config } from "../../config/config";

export const getUnit = async (publicKey) => {
  const account = await fetch(`${config.node}accounts?publicKey=${publicKey}`);
  const data = await account.json();
  if (data && data.data) {
    return parseInt(data.data[0].asset.payments) + 1;
  } else {
    return 0;
  }
}
