import React from 'react';

export const ContractItemActions = (props) => {

  return (
    <div className="ContractItemActionsContainer">
      <span className="ContractItemActionsSubTitle">
        <a onClick={() => props.setCurrentView("contract", {
          id: props.contract.publicKey
        })}>View Contract</a></span>
    </div>);
}
