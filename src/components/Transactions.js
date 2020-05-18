import React, { memo, useEffect, useState } from "react";
import './Transactions.less';
import { TransactionItem } from "./Transaction-item";
import { useTransactions } from "../hooks/transactions";

export const Transactions = memo(({publicKey, loggedIn}) => {

  const [transactions, activateTransactions] = useTransactions();

  useEffect(() => {
    if (loggedIn && publicKey) {
      activateTransactions({loggedIn, publicKey});
    }
  }, [loggedIn, publicKey]);

  const txs = transactions.map(tx => {
    return (
      <TransactionItem key={tx.id} tx={tx}/>
    )
  });

  return <div className="Transactions-container">
    <div className="Transactions">
      {txs.length > 0 && txs}
      {txs.length === 0 && <TransactionItem noTxs={true}/>}
    </div>
  </div>
})
