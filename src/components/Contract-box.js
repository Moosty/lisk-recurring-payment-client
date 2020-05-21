/* global BigInt */
import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import _ from 'lodash';
import { ContractItemIcon } from "./contract/ItemIcon";
import { ContractItemDetails } from "./contract/ItemDetails";
import { ReviewModal } from "./contract/ReviewModal";
import { HistoryBox, DashboardBox, ContractInfoBox } from "./contract/boxes";
import './Contract-box.less';

export const ContractBox = (props) => {

  const domRef = React.useRef();

  const [isVisible, setVisible] = React.useState(false);
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
  if (props.contract && props.box === "status") {
    switch (props.contract.asset.state) {
      case "SENDER_REVIEW":
        stateClass += props.contract.asset.senderPublicKey === props.publicKey ? "review" : "review-other";
        status = props.contract.asset.senderPublicKey === props.publicKey ? "You need to review contract" : "Sender needs to review contract";
        break;
      case "RECIPIENT_REVIEW":
        stateClass += props.contract.asset.recipientPublicKey === props.publicKey ? "review" : "review-other";
        status = props.contract.asset.senderPublicKey === props.publicKey ? "Recipient needs to review contract" : "You need to review contract";
        break;
      case "ACCEPTED":
        stateClass += "accepted";
        status = props.contract.asset.senderPublicKey === props.publicKey ? "You needs to fund contract" : "Sender needs to fund contract";
        break;
      case "ACTIVE":
        stateClass += "active";
        status = "Contract is active";
        break;
      case "ENDED":
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
    if (props.box === "status") {
      return (<div ref={domRef} className={className}><Result
          status="warning"
          title={status}
          subTitle="Wat een fantastische situatie, cash money hoes!"

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
      return (<div ref={domRef} className={className}>
        <DashboardBox contract={props.contract}/>
      </div>);
    } else if (props.box === "contract") {
      return (<div ref={domRef} className={className}>
        <ContractInfoBox contract={props.contract}/>
      </div>);
    } else  if (props.box === "review") {
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
    console.log(props)
    return (<div ref={domRef} className={className}>
      <ContractItemIcon contract={props.contract}/>
      <ContractItemDetails contract={props.contract} publicKey={props.publicKey}/>

    </div>);
  } else {
    return (<div ref={domRef} className={className}>No contracts</div>);
  }
}
