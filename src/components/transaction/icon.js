import React from 'react';
import './icon.less';
import {
  DollarOutlined,
  QuestionCircleOutlined,
  FileAddOutlined,
  FileExclamationOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FileProtectOutlined,
  FileSyncOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";

// https://ant.design/components/icon/

export const TransactionIcon = (props) => {

  switch (props.tx.type) {
    case 8:
      // transfer
      return (<div>transfer</div>);
    case 13001:
      // faucet
      return (<Avatar className={"FaucetIcon"} icon={<DollarOutlined/>}/>);
    case 13010:
      // Create
      return (<Avatar className={"CreateIcon"} icon={<FileAddOutlined/>}/>);
    case 13020:
      // Review
      if (!props.tx.asset.accept) {
        return (<Avatar  className={"AcceptIcon"} icon={<FileSearchOutlined/>}/>);
      } else {
        return (<Avatar className={"AcceptIcon"}  icon={<FileProtectOutlined />}/>);
      }
    case 13030:
      // Fund
      return (<Avatar className={"FundIcon"}  icon={<FileDoneOutlined />}/>);
    case 13040:
      // Request
      return (<Avatar className={"ActiveIcon"}  icon={<FileSyncOutlined />}/>);
    case 13050:
      // Terminate
      return (<Avatar className={"TerminateIcon"}  icon={<FileExclamationOutlined />}/>);
    default:
      // every other transaction
      console.log("Missing icon style type: " + props.type)
      return (<Avatar className="TransactionIcon" style={{backgroundColor: 'blue'}} icon={<QuestionCircleOutlined/>}/>)
  }
}
