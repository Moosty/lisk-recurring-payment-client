import React from 'react';
import {
  DollarOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
// https://ant.design/components/icon/

export const TransactionIcon = (props) => {

  switch(props.type) {
    case 8:
      // transfer
      return (<div>transfer</div>);
    case 13001:
      // faucet
      return (<Avatar style={{backgroundColor: '#008800'}} icon={<DollarOutlined/>}/>);
    default:
      // every other transaction
      console.log("Missing icon style type: " + props.type)
      return (<Avatar style={{backgroundColor: '#ff0000'}} icon={<QuestionCircleOutlined />}/>)
  }
}
