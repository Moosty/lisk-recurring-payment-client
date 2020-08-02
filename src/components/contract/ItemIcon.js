import React from 'react';
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
import './ItemIcon.less';
import { Avatar } from "antd";
// https://ant.design/components/icon/

export const ContractItemIcon = (props) => {

  switch (props.contract.asset.state) {
    case "SENDER_REVIEW":
      return (<Avatar className={"ReviewIcon"} icon={<FileSearchOutlined/>}/>);
    case "RECIPIENT_REVIEW":
      return (<Avatar className={"ReviewIcon"} icon={<FileSearchOutlined/>}/>);
    case "ACCEPTED":
      return (<Avatar className={"AcceptIcon"} icon={<FileProtectOutlined/>}/>);
    case "ACTIVE":
      return (<Avatar className={"ActiveIcon"} icon={<FileSyncOutlined />}/>);
    case "ENDED":
      return (<Avatar className={"EndIcon"} icon={<FileDoneOutlined/>}/>);
    case "TERMINATED_RECIPIENT":
      return (<Avatar className={"TerminateIcon"} icon={<FileExclamationOutlined/>}/>);
    case "TERMINATED_SENDER":
      return (<Avatar className={"TerminateIcon"} icon={<FileExclamationOutlined/>}/>);
    case 13020:
      // Review
      if (!props.tx.asset.accept) {
        return (<Avatar style={{backgroundColor: '#008800'}} icon={<FileSearchOutlined/>}/>);
      } else {
        return (<Avatar style={{backgroundColor: '#008800'}} icon={<FileProtectOutlined/>}/>);
      }
    case 13030:
      // Fund
      return (<Avatar style={{backgroundColor: '#008800'}} icon={<FileDoneOutlined/>}/>);
    case 13040:
      // Request
      return (<Avatar style={{backgroundColor: '#008800'}} icon={<FileSyncOutlined/>}/>);
    case 13050:
      // Terminate
      return (<Avatar style={{backgroundColor: '#008800'}} icon={<FileExclamationOutlined/>}/>);
    default:
      // every other contracts
      console.log("Missing icon style state: " + props.contract.asset.state)
      return (
        <Avatar className="ContractItemIcon" style={{backgroundColor: '#ff0000'}} icon={<QuestionCircleOutlined/>}/>)
  }
}
