import React from 'react';
import {
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { CreateContractTransaction } from "@moosty/lisk-recurring-payment/dist-node";

export const TransactionActions = (props) => {

  switch (props.tx.type) {
    case 8:
      // transfer
      return (<div>transfer</div>);
    case 13001:
      // faucet
      return (<div/>);
    case 13010:
      // Create
      const tx = new CreateContractTransaction(props.tx);
      const contractPublicKey = tx.getContractPublicKey();
      return (
        <div className="TransactionActionsContainer">
          <span className="TransactionActionsSubTitle">
            <a onClick={() => props.setCurrentView("contract", {
              id: contractPublicKey
            })}>View Contract</a></span>
        </div>
      );
    default:
      // every other transaction
      return (
        <div className="TransactionActionsContainer">
          <span className="TransactionActionsSubTitle">
            <a onClick={() => props.setCurrentView("contract", {
              id: props.tx.asset.contractPublicKey
            })}>View Contract</a></span>
        </div>
      );
  }
}
