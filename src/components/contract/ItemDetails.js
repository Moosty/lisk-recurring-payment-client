/* global BigInt */
import React from 'react';
import { utils } from "@liskhq/lisk-transactions";
import TimeAgo from 'react-time-ago';
import { usePayments } from "../../hooks/payments";
import './ItemDetails.less';
import { useAccount } from "../../hooks/account";

const {convertBeddowsToLSK} = utils;

export const ContractItemDetails = (props) => {
  const sender = useAccount(props.contract.asset.senderPublicKey);
  const recipient = useAccount(props.contract.asset.recipientPublicKey);
  const [
    paymentsReady,
    paymentsLeft,
    nextPayment,
    countdown,
    now,
    fundedUnits,
  ] = usePayments(props.contract);
  switch (props.contract.asset.state) {
    case "SENDER_REVIEW":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.senderPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Awaiting your review</span> :
            <span className="ContractItemDetailsSubTitle">Awaiting review from {sender.username}</span>}
        </div>
      );
    case "RECIPIENT_REVIEW":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.recipientPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Awaiting your review</span> :
            <span className="ContractItemDetailsSubTitle">Awaiting review from {recipient.username}</span>}
        </div>
      );
    case "ACCEPTED":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.senderPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Awaiting funds from you</span> :
            <span className="ContractItemDetailsSubTitle">Awaiting funds from {sender.username}</span>}
        </div>
      );
    case "ACTIVE":
      const next = new Date(new Date().getTime() + ((nextPayment - now) * 1000));
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          <span className="ContractItemDetailsSubTitle">
          {fundedUnits - props.contract.asset.payments > 0 && fundedUnits - props.contract.asset.payments >= paymentsReady ?
            props.contract.asset.recipientPublicKey === props.publicKey ?
              (nextPayment - now) < 0 ?
                <span>{parseFloat(convertBeddowsToLSK((BigInt(props.contract.asset.unit.amount) * BigInt(fundedUnits - props.contract.asset.payments)).toString())).toFixed(0)}TKN ready for payment</span>:
                <span>Next payment <TimeAgo date={next}/></span> :
              `Contract is active` :
            props.contract.asset.senderPublicKey === props.publicKey ?
              `Awaiting funds from you` :
              `Awaiting funds from ${sender.username}`}
          </span>
        </div>
      );
    case "ENDED":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          <span className="ContractItemDetailsSubTitle">Contract has ended</span>
        </div>
      );
    case "TERMINATED_RECIPIENT":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.recipientPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Contract is terminated by you</span> :
            <span className="ContractItemDetailsSubTitle">Contract is terminated by {sender.username}</span>}
        </div>
      );
    case "TERMINATED_SENDER":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.senderPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Contract is terminated by you</span> :
            <span className="ContractItemDetailsSubTitle">Contract is terminated by {sender.username}</span>}
        </div>
      );
    default:
      // every other transaction
      return (<div className="ContractItemDetailsContainer">
        <span className="ContractItemDetailsTitle">Unknown contract state</span>
        <span className="ContractItemDetailsSubTitle">State: {props.contract.asset.state}</span>
      </div>)
  }
}
