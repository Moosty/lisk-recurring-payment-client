import React from 'react';
import './Footer.less';
import { Menu } from "antd";
import { AuditOutlined, DashboardOutlined, HistoryOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export const Footer = ({switchCreate, setView, currentView}) => {

  const handleClick = (event) => {
    if (event.key === 'create') {
      switchCreate();
    } else {
      setView(event.key);
    }
  }

  return (
    <div className="Footer">
      <Menu className="Footer-menu" onClick={handleClick} selectedKeys={[currentView.view]} mode="horizontal">
        <Menu.Item key="overview" icon={<DashboardOutlined/>}>
          Overview
        </Menu.Item>
        <Menu.Item key="contracts" icon={<HistoryOutlined/>}>
          Contracts
        </Menu.Item>
        <Menu.Item key="create" icon={<AuditOutlined/>}>
          Recurring Payment
        </Menu.Item>
        <Menu.Item key="about" icon={<QuestionCircleOutlined/>}>
          About
        </Menu.Item>
      </Menu>
    </div>);
}
