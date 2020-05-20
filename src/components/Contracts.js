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

  const cts = contracts.map(contract => {
    return (
      <ContractItem
        key={contract.address}
        contract={contract}
        setCurrentView={setCurrentView}
        publicKey={publicKey}/>
    )
  });
  const sortedContracts = _.orderBy(cts, ['state'], ['desc']);
  console.log(contracts, cts, sortedContracts)
  return <div className="Contracts-container">
    <div className="Contracts">
      {cts.length > 0 && sortedContracts}
      {cts.length === 0 && <ContractItem noCts={true}/>}
    </div>
  </div>
})
