import React, { useEffect, useRef, useState } from 'react';
import { ContractBox } from "./Contract-box";
import { useContract } from "../hooks/contract";
import './Contract.less';

export const Contract = ({
                           api,
                           contractId,
                           setCurrentView,
                           publicKey,
                           doAccept,
                           doReview,
                           doFund,
                           doRequest,
                           doTerminate,
                         }) => {

  const [nonce, setNonce] = useState(0);
  const [request, setRequest] = useState(true);
  const [fund, setFund] = useState(false);
  const [contract, setContract] = useContract(() => {
  }, setNonce);
  const fundInput = useRef(null);

  useEffect(() => {
    if (contractId) {
      setContract({publicKey: contractId});
    }
  }, [contractId]);

  if (contract.publicKey && contract.asset) {
    let i = 0;
    const boxes = ['overview','status', 'dashboard'];

    boxes.push('contract');
    boxes.push('history');
    const cts = boxes.map(box => {
      i++;
      return (
        <ContractBox
          api={api}
          key={box}
          contract={contract}
          setCurrentView={setCurrentView}
          publicKey={publicKey}
          box={box}
          doAccept={doAccept}
          doReview={doReview}
          doFund={doFund}
          doRequest={doRequest}
          doTerminate={doTerminate}
          setRequest={setRequest}
          request={request}
          setFund={setFund}
          fund={fund}
          fundInput={fundInput}
        />
      )
    });

    return (
      <div className="ContractContainer">
        <div className="ContractContent">
          {cts}
        </div>
      </div>);
  }
  return (
    <div className="ContractContainer">
      <div className="ContractContent">
        <ContractBox
          key={"not-found"}
          setCurrentView={setCurrentView}
          publicKey={publicKey}
          box={"not-found"}
        />
      </div>
    </div>)
}
