import React, { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Menu, Dropdown, Tooltip, } from 'antd';
import { DownOutlined, CopyOutlined } from '@ant-design/icons';
import { utils } from "@liskhq/lisk-transactions";
import { SprinklerModal } from "../SprinklerModal";
import { useSprinkler } from "../../hooks/sprinkler";
import BigNum from "@liskhq/bignum/bignum";
import { useWallet } from "../../hooks/wallet";
import './ContractHeader.less';
import { useContract } from "../../hooks/contract";
import { convert } from "../../utils";

const {convertBeddowsToLSK} = utils;

const types = [
  "base32_address",
  "old_address",
  "binary_address",
  "public_key",
];

export const ContractHeader = (props) => {
  const [sprinklerOpen, setSprinkler] = useState(false);
  const [addressType, setAddressType] = useState(types[0]);
  const [addresses, setAddresses] = useState({base32_address: "", old_address: "", binary_address: ""});
  const [balance, setBalance] = useState(new BigNum(0));
  const [canDoSprinkler] = useSprinkler(balance);
  const [contract, setContract] = useContract(setBalance);

  useEffect(() => {
    return () => {
      setContract({publicKey: ""});
    }
  }, []);

  useEffect(() => {
    if (props.currentView.id) {
      setContract({publicKey: props.currentView.id});
      const addresses = convert(props.currentView.id);
      setAddresses(addresses);
    } else {
      setContract({publicKey: ""});
    }
  }, [props.contractPublicKey])

  const getHeaderMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <CopyToClipboard text={addressType === "public_key" ? props.currentView.id : props.address[addressType] || ""}>
            <span>COPY</span>
          </CopyToClipboard>
        </Menu.Item>
        <Menu.Item onClick={() => setAddressType(types[3])}>
          Public Key
        </Menu.Item>
        <Menu.Item onClick={() => setAddressType(types[0])}>
          Base32 Address
        </Menu.Item>
        <Menu.Item onClick={() => setAddressType(types[1])}>
          Old Address
        </Menu.Item>
        <Menu.Item onClick={() => setAddressType(types[2])}>
          Binary Address
        </Menu.Item>
      </Menu>
    );
  }

  const dropDownHeader = (
    <Dropdown overlay={getHeaderMenu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <DownOutlined style={{fontSize: '16px', color: '#ffcc00'}}/>
      </a>
    </Dropdown>
  );

  console.log(contract)

  return <div className={`ContractHeader`}>
    <span className="ContractTitle">Contract</span><span className="ContractSubTitle">{contract.asset ? contract.asset.title : ""}</span><br/>
    <h2 className="Balance">{convertBeddowsToLSK(balance.toString())} TKN</h2>
    <span className="subtitle-Balance">Total Balance</span><br/>
    <h2 className="ContractAddress">
      {addressType === "public_key" ? `${props.currentView.id.slice(0, 34)}...` : addresses[addressType] || ""}
      &nbsp; {dropDownHeader} &nbsp;
      <Tooltip title="Copy">
        <CopyToClipboard text={addressType === "public_key" ? props.currentView.id : addresses[addressType] || ""}>
          <CopyOutlined/>
        </CopyToClipboard>
      </Tooltip>
    </h2>
    <span className="subtitle-Address">{addressType === "public_key" ? `Public Key` : `Address`}</span>
  </div>
}
