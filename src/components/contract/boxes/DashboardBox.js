import React, { useEffect, useState } from 'react';
import { Button, Progress, InputNumber } from "antd";
import Countdown from 'react-countdown';
import './DashboardBox.less';
import { usePayments } from "../../../hooks/payments";

export const DashboardBox = ({contract, doRequest, publicKey, doFund, doTerminate}) => {
  const [
    paymentsReady,
    paymentsLeft,
    nextPayment,
    countdown,
    now,
    fundedUnits,
  ] = usePayments(contract);
  const [request, setRequest] = useState(true);
  const [units, setUnits] = useState(contract.asset.unit.total - fundedUnits);
  const [terminate, setTerminate] = useState(false);
  const [fund, setFund] = useState(false);
  const next = new Date(new Date().getTime() + ((nextPayment - now) * 1000));

  useEffect(() => {
    setFund(false);
  }, [fundedUnits]);

  return (
    <div className="DashboardContainer">
      <div className="DashboardBox">
        <Progress type="dashboard"
                  percent={contract.asset.payments > 0 ? (contract.asset.payments / contract.asset.unit.total) * 100 : 0}
                  format={() => `${contract.asset.payments}/${contract.asset.unit.total}`}/><br/>
        Payments
      </div>
      <div className="DashboardBox">
        <Progress type="dashboard" percent={fundedUnits > 0 ? (contract.asset.unit.total / fundedUnits) * 100 : 0}
                  format={() => `${fundedUnits}/${contract.asset.unit.total}`}/><br/>
        Funds
      </div>
      {publicKey === contract.asset.recipientPublicKey && fundedUnits > 0 &&
      (contract.asset.state === "ACTIVE" || contract.asset.state === "ACCEPTED") &&
      <div className="DashboardBox">
        <h2><Countdown date={next} key={next}>
          {request && fundedUnits > 0 && <Button onClick={() => {
            setRequest(false);
            doRequest({contractPublicKey: contract.publicKey})
          }} type="button" className="btn-success btn-lg">
            Request now
          </Button>}
        </Countdown></h2>
        Next payment
      </div>}
      {publicKey === contract.asset.recipientPublicKey && contract.asset.state === "ACTIVE" && fundedUnits > 0 &&
      <div className="DashboardBox">
        <h1>{paymentsReady}</h1>
        Payments ready
      </div>}
      {contract.asset.state === "ACTIVE" && contract.asset.payments > 0 &&
      <div className="DashboardBox">
        {!terminate && <Button onClick={() => {
          setTerminate(true);
          doTerminate({
            contractPublicKey: contract.publicKey,
            peerPublicKey: contract.asset.senderPublicKey === publicKey ?
              contract.asset.recipientPublicKey :
              contract.asset.senderPublicKey
          })
        }} type="button" className="btn-success btn-lg">
          Terminate contract
        </Button>}
        {terminate && <h3>Waiting for blockchain acceptance</h3>}
      </div>}
      {publicKey === contract.asset.senderPublicKey && fundedUnits < contract.asset.unit.total &&
      (contract.asset.state === "ACTIVE" || contract.asset.state === "ACCEPTED") &&
      <div className="DashboardBox">
        <h2>Fund</h2>
        {!fund && <div><InputNumber
          className="InputDashboardFund"
          precision={0}
          value={units}
          min={contract.asset.state === "ACCEPTED" ? contract.asset.unit.prepaid : 1}
          max={(contract.asset.unit.total - fundedUnits)}
          onChange={setUnits}/>
          <Button onClick={() => {
            setFund(true);
            doFund({
              contractPublicKey: contract.publicKey,
              units: units
            })
          }} type="button"
                  className="btn-success btn-lg">Payments
          </Button></div>}
        {fund && <h3>Waiting for blockchain acceptance</h3>}
      </div>}
    </div>
  );
}
