import { useState } from "react";
import { config } from '../config/config';
const epoch = Math.floor(new Date(config.epoch).getTime() / 1000);

export const usePayments = (start, unit, payments) => {
  const [paymentsReady, setReady] = useState(0);
  const [paymentsLeft, setLeft] = useState(0);
  const [nextPayment, setNext] = useState(0);
  const [countdown, setCountdown] = useState(0);

  console.log(epoch)

  return [
    paymentsReady,
    paymentsLeft,
    nextPayment,
    countdown,
  ]
}
