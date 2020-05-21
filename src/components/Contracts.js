import React, { memo, useEffect } from "react";
import _ from 'lodash';
import { ContractItem } from "./Contract-item";
import { useContracts } from "../hooks/contracts";
import './Contracts.less';

export const Contracts = memo(({publicKey, loggedIn, setCurrentView}) => {

  const [contracts, activateContracts] = useContracts();

  useEffect(() => {
    if (loggedIn && publicKey) {
      activateContracts({loggedIn, publicKey});
    }
  }, [loggedIn, publicKey]);

  const sortedContracts = _.orderBy(_.map(contracts, (contract) => {
    let state = 0;
    switch (contract.asset.state) {
      case "SENDER_REVIEW":
        state = contract.asset.senderPublicKey === publicKey ? 4 : 5;
        break;
      case "RECIPIENT_REVIEW":
        state = contract.asset.recipientPublicKey === publicKey ? 4 : 5;
        break;
      case "ACCEPTED":
        state = contract.asset.senderPublicKey === publicKey ? 3 : 6;
        break;
      case "ACTIVE":
        state = contract.asset.recipientPublicKey === publicKey ? 2 : 7;
        break;
      case "ENDED":
        state = 15;
        break;
      case "TERMINATED_SENDER":
        state = contract.asset.senderPublicKey === publicKey ? 10 : 9;
        break;
      case "TERMINATED_RECIPIENT":
        state = contract.asset.recipientPublicKey === publicKey ? 10 : 9;
        break;
      default:
        state = 1;
    }
    return {
      ...contract,
      state: state,
    }
  }), ['state'], ['asc']);

  const cts = sortedContracts.map(contract => {
    return (
      <ContractItem
        key={contract.address}
        contract={contract}
        setCurrentView={setCurrentView}
        publicKey={publicKey}/>
    )
  });
  return <div className="Contracts-container">
    <div className="Contracts">
      {cts.length > 0 && cts}
      {cts.length === 0 && <ContractItem noCts={true}/>}
    </div>
  </div>
})
