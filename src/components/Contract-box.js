/* global BigInt */
import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import _ from 'lodash';
import { ContractItemIcon } from "./contract/ItemIcon";
import { ContractItemDetails } from "./contract/ItemDetails";
import { ReviewModal } from "./contract/ReviewModal";
import { HistoryBox, DashboardBox, ContractInfoBox, ContractBoxItemActions } from "./contract/boxes";
import './Contract-box.less';

export const ContractBox = (props) => {

  const domRef = React.useRef();

  const [isVisible, setVisible] = React.useState(true);
  const [reviewIsOpen, setReviewState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);
        // No need to keep observing:
        observer.unobserve(domRef.current);
      }
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);

  const checkContractReview = (data) => {
    const unit = {
      typeAmount: data.unitAmount,
      amount: (BigInt(data.amount) * BigInt(10 ** 8)).toString(),
      type: data.unitType,
      total: data.duration,
      prepaid: data.prepaid,
      terminateFee: data.terminationFee,
    };
    let updatedUnit = {};
    let oldUnit = {};
    let changes = 0;
    _.map(unit, (value, key) => {
      if (value !== props.contract.asset.unit[key]) {
        updatedUnit[key] = value;
        oldUnit[key] = props.contract.asset.unit[key];
        changes++;
      }
    })
    let asset = {
      accept: changes === 0,
      contractPublicKey: props.contract.publicKey,
      data: data.data
    }
    if (changes !== 0) {
      asset = {
        ...asset,
        unit: updatedUnit,
        unitOld: oldUnit,
        data: data.data,
      }
    }
    props.doReview(asset, setReviewState);
  }

  let stateClass = "Status-";
  let status = "";
  let action = false;
  if (props.contract && props.box === "status") {
    switch (props.contract.asset.state) {
      case "SENDER_REVIEW":
        // action = props.contract.asset.senderPublicKey === props.publicKey;
        stateClass += props.contract.asset.senderPublicKey === props.publicKey ? "review" : "review-other";
        status = props.contract.asset.senderPublicKey === props.publicKey ? "You need to review contract" : "Sender needs to review contract";
        break;
      case "RECIPIENT_REVIEW":
        // action = props.contract.asset.recipientPublicKey === props.publicKey;
        stateClass += props.contract.asset.recipientPublicKey === props.publicKey ? "review" : "review-other";
        status = props.contract.asset.recipientPublicKey === props.publicKey ? "You need to review contract" : "Recipient needs to review contract";
        break;
      case "ACCEPTED":
        action = props.contract.asset.senderPublicKey === props.publicKey;
        stateClass += "accepted";
        status = props.contract.asset.senderPublicKey === props.publicKey ? "You needs to fund contract" : "Sender needs to fund contract";
        break;
      case "ACTIVE":
        action = false;
        stateClass += "active";
        status = "Contract is active";
        break;
      case "ENDED":
        action = false
        stateClass += "ended";
        status = "Contract is complete";
        break;
      case "TERMINATED_SENDER":
        stateClass += "terminated";
        status = props.contract.asset.senderPublicKey === props.publicKey ? "Contract is terminated by you" : "Contract is terminated by sender";
        break;
      case "TERMINATED_RECIPIENT":
        stateClass += "terminated";
        status = props.contract.asset.recipientPublicKey === props.publicKey ? "Contract is terminated by you" : "Contract is terminated by recipient";
        break;
      default:
        stateClass += "unknown";
    }
  }
  let className = `Contract-box ${stateClass} ${isVisible ? ' is-visible' : ''}`;
  if (props.box !== "not-found") {
    if (props.box === "status" && action) {
      return (<div ref={domRef} className={className}><Result
          status="warning"
          title={status}
          extra={
            ((props.contract.asset.state === 'SENDER_REVIEW' && props.contract.asset.senderPublicKey === props.publicKey) ||
              (props.contract.asset.state === 'RECIPIENT_REVIEW' && props.contract.asset.recipientPublicKey === props.publicKey)
            ) && <div>
              <Button
                onClick={() => setReviewState(true)}
                type="button"
                className="btn-success btn-lg">
                Review Contract
              </Button>
              <ReviewModal
                visible={reviewIsOpen}
                onReview={(e, reset) => checkContractReview(e, reset)}
                onCancel={setReviewState}
                publicKey={props.publicKey}
                contract={props.contract}/>
            </div>
          }
        />

        </div>
      );
    } else if (props.box === "history") {
      className += " History"
      return (<div ref={domRef} className={className}>
        <HistoryBox contractPublicKey={props.contract.publicKey} contract={props.contract}/>
      </div>);
    } else if (props.box === "Overview") {
      return (<div ref={domRef} className={className}>
        <h1 className="StatusTitle">Overview</h1>
      </div>);
    } else if (props.box === "dashboard") {
      return (<div ref={domRef}>
        <DashboardBox
          publicKey={props.publicKey}
          doFund={props.doFund}
          doTerminate={props.doTerminate}
          doRequest={props.doRequest}
          contract={props.contract}
          setRequest={props.setRequest}
          request={props.request}
          fundInput={props.fundInput}
          setFund={props.setFund}
          fund={props.fund}
        />
      </div>);
    } else if (props.box === "contract") {
      return (<div ref={domRef} className={className}>
        <ContractInfoBox contract={props.contract}/>
      </div>);
    } else if (props.box === "review") {
      return (
        <div ref={domRef}>
          <Button
            onClick={() => setReviewState(true)}
            type="button"
            className="btn-success btn-lg">
            Review
          </Button>
          <ReviewModal
            visible={reviewIsOpen}
            onReview={(e, reset) => checkContractReview(e, reset)}
            onCancel={setReviewState}
            publicKey={props.publicKey}
            contract={props.contract}/>
        </div>
      )
    } else if (props.box === "fund") {
      className += " Actions";
      // return (<div ref={domRef} className={className}>
      //   {props.contract.asset.unit.prepaid > 0 && <Button onClick={() => props.doFund({
      //     contractPublicKey: props.contract.publicKey,
      //     units: props.contract.asset.unit.prepaid
      //   })}
      //                                                     type={"primary"}>Fund {props.contract.asset.unit.prepaid} unit{props.contract.asset.unit.prepaid > 0 ? "s" : ""}</Button>}
      //   <Button onClick={() => props.doFund({
      //     contractPublicKey: props.contract.publicKey,
      //     units: props.contract.asset.unit.total
      //   })} type={"primary"}>Fund All</Button>
      // </div>);
      return (
        <div ref={domRef}>
          <Button onClick={() => props.doFund({
            contractPublicKey: props.contract.publicKey,
            units: props.contract.asset.unit.total
          })} type="button"
                  className="btn-success btn-lg">Fund contract
          </Button>
          {props.contract.asset.state === "ACTIVE" &&
          <Button onClick={() => props.doTerminate({
            contractPublicKey: props.contract.publicKey,
            peerPublicKey: props.contract.asset.senderPublicKey === props.publicKey ?
              props.contract.asset.recipientPublicKey :
              props.contract.asset.senderPublicKey
          })} type="button"
                  className="btn btn-danger">Terminate contract
          </Button>}
        </div>
      )
    } else if (props.box === "request") {
      return (<div ref={domRef}>
        <Button onClick={() => props.doRequest({contractPublicKey: props.contract.publicKey})} type="button"
                className="btn-success btn-lg">Request payment
        </Button>
        {props.contract.asset.state === "ACTIVE" &&
        <Button onClick={() => props.doTerminate({
          contractPublicKey: props.contract.publicKey,
          peerPublicKey: props.contract.asset.senderPublicKey === props.publicKey ?
            props.contract.asset.recipientPublicKey :
            props.contract.asset.senderPublicKey
        })} type="button"
                className="btn btn-danger btn-lg btn3d">Terminate contract
        </Button>}
      </div>);
    } else if (props.box === "state-funding") {
      return (<div ref={domRef} className={className}>
        Funding info ({props.contract.asset.payments}/{props.contract.asset.unit.total} units) in balance
      </div>)
    } else if (props.box === "state-payment") {
      return (<div ref={domRef} className={className}>
        Payment info (x units) open for request, <br/>
        x before next unit request, <br/>
        {props.contract.asset.payments}/{props.contract.asset.unit.total} payments done
      </div>)
    }
    if (props.box !== "status") {
      return (<div ref={domRef} className={className}>
        <ContractItemIcon contract={props.contract}/>
        <ContractItemDetails contract={props.contract} publicKey={props.publicKey}/>
        <ContractBoxItemActions
          doRequest={props.doRequest}
          setRequest={props.setRequest}
          request={props.request}
          contract={props.contract}
          publicKey={props.publicKey}
          checkContractReview={checkContractReview}
          fundInput={props.fundInput}
          setFund={props.setFund}
          fund={props.fund}
        />
      </div>);
    } else {
      return <div ref={domRef}/>
    }
  } else {
    return (<div ref={domRef} className={className}>No contracts</div>);
  }
}
