import React from 'react';
import {
  DollarOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import './Details.less';

export const TransactionDetails = (props) => {

  switch(props.tx.type) {
    case 8:
      // transfer
      return (<div>transfer</div>);
    case 13001:
      // faucet
      return (<div className="TransactionDetailsContainer">
        <span className="TransactionDetailsTitle">Faucet transaction</span>
        <span className="TransactionDetailsSubTitle">Received 99.9 TKN</span>
      </div>);
    default:
      // every other transaction
      console.log("Missing icon style type: " + props.tx.type)
      return (<Avatar style={{backgroundColor: '#ff0000'}} icon={<QuestionCircleOutlined />}/>)
  }
}
