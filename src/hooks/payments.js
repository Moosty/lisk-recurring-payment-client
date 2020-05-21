/* global BigInt */
import { useEffect, useState } from "react";
import { config } from '../config/config';

const epoch = Math.floor(new Date(config.epoch).getTime() / 1000);

export const usePayments = (contract) => {
  const [paymentsReady, setReady] = useState(0);
  const [paymentsLeft, setLeft] = useState(0);
  const [nextPayment, setNext] = useState(0);
  const [fundedUnits, setFund] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [now, setNow] = useState(0);
  const TYPES = [
    'MINUTES',
    'HOURS',
    'DAYS',
    'MONTHS',
    'YEARS',
  ];

  const slotTypes = {
    [TYPES[0]]: 60, // minutes
    [TYPES[1]]: 60 * 60, // hours
    [TYPES[2]]: 24 * 60 * 60, // days
    [TYPES[3]]: 30.4 * 24 * 60 * 60, // months
    [TYPES[4]]: 365 * 24 * 60 * 60, // years
  }
  useEffect(() => {
    setNext(epoch + (contract.asset.start +
      ((contract.asset.payments + 1) *
        contract.asset.unit.typeAmount * slotTypes[contract.asset.unit.type])
    ))
    const n = Math.floor(new Date().getTime() / 1000)
    setNow(n);
    const unitsBalance = Math.floor((BigInt(contract.balance) / BigInt(contract.asset.unit.amount)).toString());
    setFund(unitsBalance + contract.asset.payments);
    const pr = Math.floor(
      (n-epoch - contract.asset.start) / (contract.asset.unit.typeAmount * slotTypes[contract.asset.unit.type])
    ) - contract.asset.payments
      setReady(pr <= unitsBalance ? pr : unitsBalance);

  }, [contract]);
  return [
    paymentsReady,
    paymentsLeft,
    nextPayment,
    countdown,
    now,
    fundedUnits,
  ]
}
