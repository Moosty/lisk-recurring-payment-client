import React from 'react';
import {Progress } from "antd";
import './DashboardBox.less';
import { usePayments } from "../../../hooks/payments";
export const DashboardBox = ({contract}) => {
  const [
    paymentsReady,
    paymentsLeft,
    nextPayment,
    countdown,
  ] = usePayments(contract.asset.start, contract.asset.unit, contract.asset.payments);
  return (
    <div className="DashboardContainer">
      <div className="DashboardBox">
        <Progress type="dashboard" percent={contract.asset.payments / contract.asset.unit.total * 100} format={() => `${contract.asset.payments}/${contract.asset.unit.total}`} /><br />
        Payments
      </div>
      <div className="DashboardBox">
        <Progress type="dashboard" percent={75} format={() => `${contract.asset.payments}/${contract.asset.unit.total}`} /><br/>
        Funds
      </div>
      <div className="DashboardBox">Next Payment</div>
      <div className="DashboardBox">Contract ends</div>
    </div>
  );
}
