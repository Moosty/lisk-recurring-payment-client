import React, { useState } from 'react';
import { Button } from "antd";
import { ReviewModal } from "../ReviewModal";
import Countdown from "react-countdown";
import { usePayments } from "../../../hooks/payments";

export const ContractBoxItemActions = (props) => {

  const [reviewIsOpen, setReviewState] = useState(false);
  const [
    paymentsReady,
    paymentsLeft,
    nextPayment,
    countdown,
    now,
    fundedUnits,
  ] = usePayments(props.contract);

  return (
    <div className="ContractItemActionsContainer">
      {((props.contract.asset.state === 'SENDER_REVIEW' && props.contract.asset.senderPublicKey === props.publicKey) ||
        (props.contract.asset.state === 'RECIPIENT_REVIEW' && props.contract.asset.recipientPublicKey === props.publicKey))
      && <div>
        <Button
          onClick={() => setReviewState(true)}
          type="button"
          className="btn-success btn-lg">
          Review Contract
        </Button>
        <ReviewModal
          visible={reviewIsOpen}
          onReview={(e) => {
            props.checkContractReview(e, setReviewState);
            setReviewState(false);
          }}
          onCancel={setReviewState}
          publicKey={props.publicKey}
          contract={props.contract}/>
      </div>}
      {nextPayment - now <= 0 && props.publicKey === props.contract.asset.recipientPublicKey && fundedUnits > 0 &&
      (props.contract.asset.state === "ACTIVE" || props.contract.asset.state === "ACCEPTED") && props.request &&
      <Button onClick={() => {
        props.setRequest(false);
        props.doRequest({contractPublicKey: props.contract.publicKey})
      }} type="button" className="btn-success btn-lg">
        Withdraw
      </Button>}
      {props.publicKey === props.contract.asset.senderPublicKey && fundedUnits < props.contract.asset.unit.total &&
      (props.contract.asset.state === "ACTIVE" || props.contract.asset.state === "ACCEPTED") && !props.fund && <Button onClick={() => {
        props.fundInput.current.focus();
      }}>Fund</Button>}
    </div>);
}
