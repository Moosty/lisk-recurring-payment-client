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
import { Avatar } from "antd";
// https://ant.design/components/icon/

export const TransactionIcon = (props) => {

  switch (props.tx.type) {
    case 8:
      // transfer
      return (<div>transfer</div>);
    case 13001:
      // faucet
      return (<Avatar style={{backgroundColor: '#008800'}} icon={<DollarOutlined/>}/>);
    case 13010:
      // Create
      return (<Avatar style={{backgroundColor: '#008800'}} icon={<FileAddOutlined/>}/>);
    case 13020:
      // Review
      if (!props.tx.asset.accept) {
        return (<Avatar style={{backgroundColor: '#de742d'}} icon={<FileSearchOutlined/>}/>);
      } else {
        return (<Avatar style={{backgroundColor: '#008800'}} icon={<FileProtectOutlined />}/>);
      }
    case 13030:
      // Fund
      return (<Avatar style={{backgroundColor: '#0a2384'}} icon={<FileDoneOutlined />}/>);
    case 13040:
      // Request
      return (<Avatar style={{backgroundColor: '#008800'}} icon={<FileSyncOutlined />}/>);
    case 13050:
      // Terminate
      return (<Avatar style={{backgroundColor: '#88000b'}} icon={<FileExclamationOutlined />}/>);
    default:
      // every other transaction
      console.log("Missing icon style type: " + props.type)
      return (<Avatar className="TransactionIcon" style={{backgroundColor: '#ff0000'}} icon={<QuestionCircleOutlined/>}/>)
  }
}
