import React from "react";
import './Transactions.less';
import { TransactionItem } from "./Transaction-item";

export const Contracts = (props) => {

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(number => (
    <TransactionItem key={ number }>Contract { number }</TransactionItem>
  ));

  return <div className="Transactions-container">
    <div className="Transactions">
      {items}
    </div>
    {/*<div className="Transaction-fade-top"/>*/}
  </div>
}
