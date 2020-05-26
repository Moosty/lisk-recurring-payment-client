/* global BigInt */
import React, { useEffect, useState } from 'react';
import { utils } from "@liskhq/lisk-transactions";
import { Button, Progress, InputNumber, Popconfirm } from "antd";
import Countdown from 'react-countdown';
import { usePayments } from "../../../hooks/payments";
import './DashboardBox.less';

const {convertBeddowsToLSK} = utils;

export const DashboardBox = ({contract, doRequest, publicKey, doFund, doTerminate, request, setRequest, fundInput, setFund, fund}) => {
  const [
    paymentsReady,
    paymentsLeft,
    nextPayment,
    countdown,
    now,
    fundedUnits,
  ] = usePayments(contract);
  const [units, setUnits] = useState(contract.asset.unit.total - fundedUnits);
  const [terminate, setTerminate] = useState(false);
  const next = new Date(new Date().getTime() + ((nextPayment - now) * 1000));

  useEffect(() => {
    setFund(false);
    setRequest(true);
  }, [fundedUnits, paymentsReady]);

  return (
    <div className="DashboardContainer">
      <div className="DashboardBox">
        <Progress type="dashboard"
                  percent={contract.asset.payments > 0 ? (contract.asset.payments / contract.asset.unit.total) * 100 : 0}
                  format={() => `${contract.asset.payments}/${contract.asset.unit.total}`}/><br/>
        <span className="DaschboardboxTitle">Payments</span>
      </div>
      <div className="DashboardBox">
        <Progress
          type="dashboard"
          percent={fundedUnits > 0 ? (fundedUnits / contract.asset.unit.total) * 100 : 0}
          format={() => `${fundedUnits} / ${contract.asset.unit.total}`}/> <span className="DaschboardboxTitle">
        {parseFloat(convertBeddowsToLSK((BigInt(contract.asset.unit.amount) * BigInt(fundedUnits)).toString())).toFixed(2)}TKN<br/>
        Funds</span>
      </div>
      {publicKey === contract.asset.recipientPublicKey && fundedUnits > 0 &&
      (contract.asset.state === "ACTIVE" || contract.asset.state === "ACCEPTED") &&
      <div className="DashboardBox">
        <h2><Countdown date={next} key={next}>
          {fundedUnits > 0 && <Button onClick={() => {
            setRequest(false);
            doRequest({contractPublicKey: contract.publicKey})
          }} type="button" disabled={paymentsReady === 0 || !request} className="btn-success btn-lg">
            {paymentsReady === 0 ? `Waiting for funds` : request ? `Withdraw` : `Await confirmation`}
          </Button>}
        </Countdown></h2>
         <span className="DaschboardboxTitle">Next payment</span>
      </div>}
      {publicKey === contract.asset.recipientPublicKey && contract.asset.state === "ACTIVE" && fundedUnits > 0 &&
      <div className="DashboardBox">
        <h2>{paymentsReady}</h2>
        {paymentsReady > 0 &&
        <span className="DaschboardboxTitle">{parseFloat(convertBeddowsToLSK((BigInt(paymentsReady) * BigInt(contract.asset.unit.amount)).toString())).toFixed(2)} TKN<br/></span>}
        <span className="DaschboardboxTitle">Payments ready</span>
      </div>}
      {contract.asset.state === "ACTIVE" && contract.asset.payments > 0 &&
      <div className="DashboardBox">
        {!terminate &&
        <Popconfirm
          title="Are you sure you want to terminate this contract?"
          onConfirm={() => {
            setTerminate(true);
            doTerminate({
              contractPublicKey: contract.publicKey,
              peerPublicKey: contract.asset.senderPublicKey === publicKey ?
                contract.asset.recipientPublicKey :
                contract.asset.senderPublicKey
            })
          }}
          onCancel={() => {
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="button" className="btn-success btn-lg">
            Terminate contract
          </Button>
        </Popconfirm>}
        {terminate && <h3>Await confirmation</h3>}
      </div>}
      {publicKey === contract.asset.senderPublicKey && fundedUnits < contract.asset.unit.total &&
      (contract.asset.state === "ACTIVE" || contract.asset.state === "ACCEPTED") &&
      <div className="DashboardBox">
        <h2>Fund</h2>
        {!fund && <div><InputNumber
          className="InputDashboardFund"
          ref={fundInput}
          precision={0}
          value={units}
          min={contract.asset.state === "ACCEPTED" ? contract.asset.unit.prepaid : 1}
          max={(contract.asset.unit.total - fundedUnits)}
          onChange={setUnits}/>
          <Popconfirm
            title="Are you sure you want to fund this contract?"
            onConfirm={() => {
              setFund(true);
              doFund({
                contractPublicKey: contract.publicKey,
                units: units
              })
            }}
            onCancel={() => {
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="button"
              className="btn-success btn-lg">Payments
            </Button>
          </Popconfirm>
        </div>}
        {fund && <span className="DaschboardboxTitle>">Await confirmation</span>}
      </div>}
    </div>
  );
}
