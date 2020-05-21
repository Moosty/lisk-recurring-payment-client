import React from 'react';
import './ItemDetails.less';

export const ContractItemDetails = (props) => {

  switch (props.contract.asset.state) {
    case "SENDER_REVIEW":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.senderPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Awaiting your review</span> :
            <span className="ContractItemDetailsSubTitle">Awaiting sender review</span>}
        </div>
      );
    case "RECIPIENT_REVIEW":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.recipientPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Awaiting your review</span> :
            <span className="ContractItemDetailsSubTitle">Awaiting recipient review</span>}
        </div>
      );
    case "ACCEPTED":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.senderPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Awaiting funds from you</span> :
          <span className="ContractItemDetailsSubTitle">Awaiting funds from sender</span>}
        </div>
      );
    case "ACTIVE":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.recipientPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Time to next request/request available</span> :
            <span className="ContractItemDetailsSubTitle">Contract is active</span>}
        </div>
      );
    case "ENDED":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          <span className="ContractItemDetailsSubTitle">Contract is ended</span>
        </div>
      );
    case "TERMINATED_RECIPIENT":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.recipientPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Contract is terminated by you</span> :
            <span className="ContractItemDetailsSubTitle">Contract is terminated by recipient</span>}
        </div>
      );
    case "TERMINATED_SENDER":
      return (
        <div className="ContractItemDetailsContainer">
          <span className="ContractItemDetailsTitle">Contract: <b>{props.contract.asset.title}</b></span>
          {props.contract.asset.senderPublicKey === props.publicKey ?
            <span className="ContractItemDetailsSubTitle">Contract is terminated by you</span> :
            <span className="ContractItemDetailsSubTitle">Contract is terminated by sender</span>}
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
