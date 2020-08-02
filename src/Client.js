import React, { memo, useState, useEffect } from "react";
import { Button, notification, Divider, Space } from 'antd';
import { useName } from "./hooks/names";
import Login from "./components/Login";
import { AccountHeader } from "./components/AccountHeader";
import { ContractHeader } from "./components/contract/ContractHeader";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";
import { convert } from "./utils";
import { Transactions } from "./components/Transactions";
import { Contracts } from "./components/Contracts";
import { Footer } from "./components/Footer";
import { CreateForm } from "./components/CreateForm";
import { doSprinkler } from "./transactions/sprinkler";
import { doCreate } from "./transactions/create";
import { useView } from "./hooks/view";
import { Contract } from "./components/Contract";
import { doReview } from "./transactions/review";
import { doTerminate } from "./transactions/terminate";
import { doRequest } from "./transactions/request";
import { doFund } from "./transactions/fund";
import { About } from "./components/About";

const Context = React.createContext({name: 'Default'});

export const Client = memo(({id, close}) => {
  const [name, setName] = useName(null);
  const [passphrase, setPassphrase] = useState("cash long chest mutual liar oil echo noble quantum excite hole lawn");
  const [loggedIn, setLoggedIn] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState({base32_address: "", old_address: "", binary_address: ""});
  const [currentView, setCurrentView] = useView();
  const [createIsOpen, setCreate] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (passphrase) {
      const addressPublicKey = getAddressAndPublicKeyFromPassphrase(passphrase);
      const addresses = convert(addressPublicKey.publicKey);
      setAddress(addresses);
      setPublicKey(addressPublicKey.publicKey);
    }
  }, [loggedIn, passphrase])

  const openCreate = () => {
    setCreate(!createIsOpen);
  }

  const checkContract = (data, cancel) => {
    doCreate(passphrase, data, api, setCreate, cancel, resultCreate)
  }

  const checkReview = (data, setClose) => {
    doReview(passphrase, data, api, setClose, resultReview)
  }

  const resultReview = (status, errors = []) => {
    if (status) {

    }
  }

  const resultCreate = (status, errors = []) => {
    if (status) {

    }
  }
  const className = `Wallet Wallet-${id}`;
  if (loggedIn) {

    return (
      <Context.Provider value={{name: 'Recurring Payment'}}>
        {contextHolder}
        <div className={className}>
          {(currentView.view !== "contract" || currentView.view === "contract") && <AccountHeader
            currentView={currentView}
            loggedIn={loggedIn}
            publicKey={publicKey}
            name={name}
            address={address}
            setLogout={() => setLoggedIn(false)}
            requestSprinkler={(nonce) => doSprinkler(passphrase, name, nonce)}
          />}
          {currentView.view === "contract_tmp" && <ContractHeader
            currentView={currentView}
            loggedIn={loggedIn}
            publicKey={publicKey}
            name={name}
            address={address}
            setLogout={() => setLoggedIn(false)}
            requestSprinkler={(nonce) => doSprinkler(passphrase, name, nonce)}
          />}
          {currentView.view === "overview" &&
          <Transactions
            loggedIn={loggedIn}
            publicKey={publicKey}
            address={address}
            setCurrentView={setCurrentView}
          />}
          {currentView.view === "contracts" &&
          <Contracts
            loggedIn={loggedIn}
            publicKey={publicKey}
            address={address}
            setCurrentView={setCurrentView}
          />}
          {currentView.view === "contract" &&
          <Contract
            api={api}
            loggedIn={loggedIn}
            address={address}
            setCurrentView={setCurrentView}
            publicKey={publicKey}
            contractId={currentView.id}
            doAccept={(id) => doReview(passphrase, {contractPublicKey: id, accept: true}, api)}
            // doReview={(data) => doReview(passphrase, data)}
            doFund={(data) => doFund(passphrase, data, api)}
            doRequest={(data) => doRequest(passphrase, data, api)}
            doTerminate={(data) => doTerminate(passphrase, data, api)}
            doReview={(data, setClose) => checkReview(data, setClose)}
          />}
          {currentView.view === "about" && <About />}
          <Footer
            currentView={currentView}
            setView={setCurrentView}
            switchCreate={openCreate}/>
          <CreateForm
            visible={createIsOpen}
            onCreate={(e) => checkContract(e)}
            onCancel={openCreate}
            publicKey={publicKey}
          />
        </div>
      </Context.Provider>
    )
  } else {
    return (
        <Login passphrase={passphrase} username={name}
               setPassphrase={(value) => setPassphrase(value)}
               setLogin={() => setLoggedIn(true)}
               setUsername={(value) => setName(value)}
               id={id}/>
    );
  }
});
