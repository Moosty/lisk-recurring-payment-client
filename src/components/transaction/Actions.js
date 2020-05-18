import React from 'react';
import {
  DollarOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
// https://ant.design/components/icon/

export const TransactionActions = (props) => {

  switch(props.tx.type) {
    case 8:
      // transfer
      return (<div>transfer</div>);
    case 13001:
      // faucet
      return (<div />);
    default:
      // every other transaction
      console.log("Missing icon style type: " + props.tx.type)
      return (<Avatar style={{backgroundColor: '#ff0000'}} icon={<QuestionCircleOutlined />}/>)
  }
}
