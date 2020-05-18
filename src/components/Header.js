import React, { useEffect, useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Menu, Dropdown, } from 'antd';
import { DownOutlined, } from '@ant-design/icons';
import { utils } from "@liskhq/lisk-transactions";
import './Header.less';
import { SprinklerModal } from "./SprinklerModal";
import { useSprinkler } from "../hooks/sprinkler";
import BigNum from "@liskhq/bignum/bignum";
import { useWallet } from "../hooks/wallet";
const { convertBeddowsToLSK } = utils;

const types = [
  "base32_address",
  "old_address",
  "binary_address",
];

export const Header = (props) => {
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
          <CopyToClipboard text={props.address[addressType]} >
            <span>COPY</span>
          </CopyToClipboard>
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
    <span className="Name">{props.name}</span><br />
    <h2 className="Balance">{convertBeddowsToLSK(balance.toString())} TKN
      {canDoSprinkler && <a onClick={() => setSprinkler(true)}>+</a>}</h2>
    <span className="subtitle-Balance">Total Balance</span><br />
    <h2 className="Address">{props.address[addressType] || ""} &nbsp; {dropDownHeader}</h2>
    <span className="subtitle-Address">Address</span>
    <SprinklerModal requestSprinkler={props.requestSprinkler} onClose={() => setSprinkler(false)} visible={sprinklerOpen} />
  </div>
}
