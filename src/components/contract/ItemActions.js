import React from 'react';
import { Button } from "antd";

export const ContractItemActions = (props) => {

  return (
    <div className="ContractItemActionsContainer">
        <Button onClick={() => props.setCurrentView("contract", {
          id: props.contract.publicKey
        })}>View Contract</Button>
    </div>);
}
