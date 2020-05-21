/* global BigInt */
import React from 'react';
import './ContractBox.less';
import { utils } from "@liskhq/lisk-transactions";
import { useAccount } from "../../../hooks/account";
import { ContractNotes } from './';
const {convertBeddowsToLSK} = utils;

export const ContractInfoBox = ({contract}) => {

  const recipient = useAccount(contract.asset.recipientPublicKey);
  const sender = useAccount(contract.asset.recipientPublicKey);
  console.log(contract, recipient, sender)
  return (
    <div className="ContractInfo">
      <h2>{contract.asset.title}</h2>
      <span>Contract public key: <br />
      <b className="ContractInfoPublicKey">{contract.publicKey}</b></span>
      <hr/>
      <span>Sender: <b>{sender.username}</b></span><br />
      <span>Recipient: <b>{recipient.username}</b></span>
      <br/>
      <br/>
      <p>Contract duration is&nbsp;
        <b>{contract.asset.unit.total * contract.asset.unit.typeAmount} {contract.asset.unit.type.toLowerCase()}</b>.
        Every {contract.asset.unit.typeAmount}&nbsp;
        <b>{contract.asset.unit.type.substr(0, contract.asset.unit.type.length - 1).toLowerCase()}
          {contract.asset.unit.typeAmount > 1 ? "s" : ""}</b> a payment request can be made of <b>
          {convertBeddowsToLSK(contract.asset.unit.amount)} TKN</b> to <b>{recipient.username}</b>. The termination fee is&nbsp;
        <b>{contract.asset.unit.terminateFee}</b> payments or&nbsp;
        <b>{convertBeddowsToLSK((BigInt(contract.asset.unit.amount) * BigInt(contract.asset.unit.terminateFee)).toString())} TKN</b>.
        The minimum activation fee is <b>{contract.asset.unit.prepaid}</b> payments or&nbsp;
        <b>{convertBeddowsToLSK((BigInt(contract.asset.unit.amount) * BigInt(contract.asset.unit.prepaid)).toString())} TKN</b>.<br />
        <b>Extra notes:</b><br />
        <ContractNotes contractPublicKey={contract.publicKey} />
      </p>
    </div>
  );
}
