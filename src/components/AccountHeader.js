import React, { useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Menu, Dropdown, Tooltip, } from 'antd';
import { DownOutlined, CopyOutlined } from '@ant-design/icons';
import { utils } from "@liskhq/lisk-transactions";
import { SprinklerModal } from "./SprinklerModal";
import { useSprinkler } from "../hooks/sprinkler";
import BigNum from "@liskhq/bignum/bignum";
import { useWallet } from "../hooks/wallet";
import './AccountHeader.less';

const {convertBeddowsToLSK} = utils;

const types = [
  "base32_address",
  "old_address",
  "binary_address",
  "public_key",
];

export const AccountHeader = (props) => {
  const [sprinklerOpen, setSprinkler] = useState(false);
  const [addressType, setAddressType] = useState(types[0]);
  const [balance, setBalance] = useState(new BigNum(0));
  const [canDoSprinkler] = useSprinkler(balance);

  const [nonce, setNonce] = useState(new BigNum(0));
  const [account, setWallet] = useWallet(setBalance, setNonce);

  useEffect(() => {
    if (props.loggedIn) {
      setWallet({loggedIn: props.loggedIn, publicKey: props.publicKey});
    } else {
      setWallet({loggedIn: false, publicKey: ""});
    }
  }, [props.loggedIn])

  useEffect(() => {
    return () => {
      setWallet({loggedIn: false, publicKey: ""});
    }
  }, []);

  const getHeaderMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <CopyToClipboard text={addressType === "public_key" ? props.publicKey : props.address[addressType] || ""}>
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

  return <div className={`Header`}>
    <span className="Name">{props.name}</span><br/>
    <h2 className="Balance">{parseFloat(convertBeddowsToLSK(balance.toString())).toFixed(4)} TKN
      {canDoSprinkler && <Tooltip visible={true} title={"Request faucet tokens"} placement={"right"}><a onClick={() => setSprinkler(true)}>+</a></Tooltip>}</h2>

    <h2
      className="Address">{addressType === "public_key" ? `${props.publicKey.slice(0, 34)}...` : props.address[addressType] || ""}
      &nbsp; {dropDownHeader} &nbsp;
      <Tooltip title="Copy">
        <CopyToClipboard text={addressType === "public_key" ? props.publicKey : props.address[addressType] || ""}>
          <CopyOutlined/>
        </CopyToClipboard>
      </Tooltip>
    </h2>
    <span className="subtitle-Address">{addressType === "public_key" ? `Public Key` : `Address`}</span>
    <SprinklerModal
      nonce={nonce}
      requestSprinkler={props.requestSprinkler}
      onClose={() => setSprinkler(false)}
      visible={sprinklerOpen}/>
  </div>
}
