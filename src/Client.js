import React, { memo, useState, useEffect } from "react";
import { useName } from "./hooks/names";
import Login from "./components/Login";
import { Header } from "./components/Header";
import { getAddressAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";
import { convert } from "./utils";
import { Transactions } from "./components/Transactions";
import { Contracts } from "./components/Contracts";
import { Footer } from "./components/Footer";
import { CreateForm } from "./components/CreateForm";
import { doSprinkler } from "./transactions/sprinkler";

export const Client = memo(({id, close}) => {
  const [name, setName] = useName(null);
  const [passphrase, setPassphrase] = useState("cash long chest mutual liar oil echo noble quantum excite hole lawn");
  const [loggedIn, setLoggedIn] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState({base32_address: "", old_address: "", binary_address: ""});
  const [currentView, setView] = useState("overview");
  const [createIsOpen, setCreate] = useState(false);

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

  const checkContract = (data) => {
    console.log(data)
  }

  if (loggedIn) {
    const className = `Wallet Wallet-${id}`;
    return (
      <div className={className}>
        <Header
          loggedIn={loggedIn}
          publicKey={publicKey}
          name={name}
          address={address}
          setLogout={() => setLoggedIn(false)}
          requestSprinkler={(nonce) => doSprinkler(passphrase, name, nonce)}
        />
        {currentView === "overview" &&
        <Transactions
          loggedIn={loggedIn}
          publicKey={publicKey}
          address={address}/>}
        {currentView === "contracts" &&
        <Contracts address={address}/>}
        <Footer
          currentView={currentView}
          setView={setView}
          switchCreate={openCreate}/>
        <CreateForm
          visible={createIsOpen}
          onCreate={(e) => checkContract(e)}
          onCancel={openCreate}
          publicKey={publicKey}
        />
      </div>
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
