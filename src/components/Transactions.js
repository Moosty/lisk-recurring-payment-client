import React, { memo, useEffect } from "react";
import _ from 'lodash';
import { TransactionItem } from "./Transaction-item";
import { useTransactions } from "../hooks/transactions";
import './Transactions.less';

export const Transactions = memo(({publicKey, loggedIn, setCurrentView}) => {

  const [transactions, activateTransactions] = useTransactions();

  useEffect(() => {
    if (loggedIn && publicKey) {
      activateTransactions({loggedIn, publicKey});
    }
  }, [loggedIn, publicKey]);
  const sortedTransactions = _.orderBy(transactions, ['height'], ['desc']);
  const txs = sortedTransactions.map(tx => {
    return (
      <TransactionItem key={tx.id} tx={tx} setCurrentView={setCurrentView}/>
    )
  });

  return <div className="Transactions-container">
    <div className="Transactions">
      {txs.length > 0 && txs}
      {txs.length === 0 && <TransactionItem noTxs={true}/>}
    </div>
  </div>
})
