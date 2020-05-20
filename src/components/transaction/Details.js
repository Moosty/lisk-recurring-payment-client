import React from 'react';
import './Details.less';
import { useSimpleContract } from "../../hooks/simpleContract";

export const TransactionDetails = (props) => {

  const [contract] = useSimpleContract(props.tx.asset.contractPublicKey, props.tx.type);

  switch (props.tx.type) {
    case 8:
      // transfer
      return (<div>transfer</div>);
    case 13001:
      // faucet
      return (
        <div className="TransactionDetailsContainer">
          <span className="TransactionDetailsTitle">Faucet transaction</span>
          <span className="TransactionDetailsSubTitle">Received 99.9 TKN</span>
        </div>
      );
    case 13010:
      // Create
      return (
        <div className="TransactionDetailsContainer">
          <span className="TransactionDetailsTitle">Created recurring payment contract</span>
          <span className="TransactionDetailsSubTitle">Contract: <b>{props.tx.asset.title}</b></span>
        </div>
      );
    case 13020:
      // Review
      if (!props.tx.asset.accept) {
        return (
          <div className="TransactionDetailsContainer">
            <span className="TransactionDetailsTitle">Reviewed contract updated</span>
            <span className="TransactionDetailsSubTitle">Contract: <b>{contract ? contract.asset.title : "..."}</b></span>
          </div>
        );
      } else {
        return (
          <div className="TransactionDetailsContainer">
            <span className="TransactionDetailsTitle">Reviewed contract accepted</span>
            <span className="TransactionDetailsSubTitle">Contract: <b>{contract ? contract.asset.title : "..."}</b></span>
          </div>
        );
      }
    case 13030:
      // Fund
      return (
        <div className="TransactionDetailsContainer">
          <span className="TransactionDetailsTitle">Funded contract</span>
          <span className="TransactionDetailsSubTitle">Contract: <b>{contract ? contract.asset.title : "..."}</b></span>
        </div>
      );
    case 13040:
      // Request
      return (
        <div className="TransactionDetailsContainer">
          <span className="TransactionDetailsTitle">Requested payment</span>
          <span className="TransactionDetailsSubTitle">Contract: <b>{contract ? contract.asset.title : "..."}</b></span>
        </div>
      );
    case 13050:
      // Terminate
      return (
        <div className="TransactionDetailsContainer">
          <span className="TransactionDetailsTitle">Terminated contract</span>
          <span className="TransactionDetailsSubTitle">Contract: <b>{contract ? contract.asset.title : "..."}</b></span>
        </div>
      );
    default:
      // every other transaction
      return (<div className="TransactionDetailsContainer">
        <span className="TransactionDetailsTitle">Unkown transaction type</span>
        <span className="TransactionDetailsSubTitle">Type: {props.tx.type}</span>
      </div>)
  }
}
