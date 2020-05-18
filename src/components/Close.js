import React from "react";
import { Button } from 'antd';
import {
  CloseOutlined,
} from '@ant-design/icons';

export const Close = ({id, close}) => {
  return <Button className="Close" type="link" onClick={close.bind(null, id)} icon={<CloseOutlined/>}/>
}
