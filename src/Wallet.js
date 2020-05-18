// import React from "react";
// import { Button, Statistic, Row, Col, Layout, Typography, Menu, Dropdown } from 'antd';
// import { QuestionCircleOutlined, DownOutlined, DashboardOutlined, AuditOutlined, HistoryOutlined } from '@ant-design/icons';
// import * as cryptography from '@liskhq/lisk-cryptography';
// import './Wallet.less';
// import { Overview } from "./Overview";
// import { Contract } from "./Contract";
// import { Create } from "./Create";
//
// const {Header, Footer, Content} = Layout;
// const {Title, Text, Paragraph} = Typography;
//
// export class Wallet extends React.Component {
//   dropDownHeader = (
//     <Dropdown overlay={this.getHeaderMenu.bind(this)}>
//       <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
//         <DownOutlined style={{fontSize: '16px', color: '#ffcc00'}}/>
//       </a>
//     </Dropdown>
//   );
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       create: false,
//     }
//
//   }
//
//   switchCreate() {
//     this.setState({create: !this.state.create});
//   }
//
//   getHeaderMenu() {
//     return (
//       <Menu>
//         {!this.props.account.passphrase && <Menu.Item>
//           <a href="#">
//             Login
//           </a>
//         </Menu.Item>}
//         {this.props.account.passphrase && <Menu.Item>
//           <a onClick={this.props.logout}>
//             Logout
//           </a>
//         </Menu.Item>}
//       </Menu>
//     );
//   }
//
//   getAddress() {
//     return cryptography.getAddressFromPassphrase(this.props.account.passphrase);
//   }
//
//   getBalance() {
//     return (
//       <Row style={{textAlign: 'left', marginTop: '1em'}} gutter={16}>
//         <Col span={16}>
//           <Statistic title="Total Balance" suffix="LSK" precision={2} value={this.props.account.balance}/>
//         </Col>
//         <Col span={6}>
//           <Statistic title="ID" value={this.props.account.name}/>
//         </Col>
//         <Col span={16}>
//           <Statistic title="Address" suffix={this.dropDownHeader} value={this.getAddress()}
//                      valueStyle={{fontSize: '18px'}}/>
//         </Col>
//       </Row>
//     );
//   }
//
//   handleClick(event) {
//     if (event.key === 'create') {
//       this.switchCreate();
//     } else {
//       this.props.setView(this.props.account.name, event.key);
//     }
//   }
//
//   footerMenu(currentView) {
//     return (
//       <Menu style={{marginBottom: 0}} onClick={this.handleClick.bind(this)} selectedKeys={[currentView]} mode="horizontal">
//         <Menu.Item key="overview" icon={<DashboardOutlined />}>
//           Overview
//         </Menu.Item>
//         <Menu.Item key="create" icon={<AuditOutlined/>}>
//           Create Recurring Payment
//         </Menu.Item>
//         <Menu.Item key="contract" icon={<HistoryOutlined/>}>
//           Contracts
//         </Menu.Item>
//         <Menu.Item key="question" icon={<QuestionCircleOutlined />}>
//           ???
//         </Menu.Item>
//       </Menu>
//     );
//   }
//
//   render() {
//     return (
//       <div className={`Wallet`}>
//         <Layout>
//           <Header>
//             {this.getBalance()}
//           </Header>
//           <Content>
//             {this.props.currentView === "overview" &&
//             <Overview
//               setView={this.props.setView}
//               currentView={this.props.currentView}
//               txs={this.props.txs}
//               account={this.props.account} />}
//             {this.props.currentView === "contract" &&
//             <Contract
//               contracts={this.props.contracts}
//               setView={this.props.setView}
//               currentView={this.props.currentView}
//               viewId={this.props.viewId}
//               txs={this.props.txs}
//               account={this.props.account} />}
//             {this.props.currentView === "create" &&
//             <Create
//               contracts={this.props.contracts}
//               setView={this.props.setView}
//               currentView={this.props.currentView}
//               viewId={this.props.viewId}
//               txs={this.props.txs}
//               account={this.props.account} />}
//           </Content>
//           <Footer>
//             {this.footerMenu(this.props.currentView)}
//           </Footer>
//         </Layout>
//         <Create
//           account={this.props.account}
//           visible={this.state.create}
//           onCreate={(e) => console.log(e)}
//           onCancel={() => {
//             this.switchCreate();
//           }}
//         />
//       </div>
//     )
//   }
// }
