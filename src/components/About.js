import React from 'react';
import { Typography, Divider } from 'antd';
import './About.less';

const {Title, Paragraph, Text} = Typography;

export const About = (props) => {

  return (
    <div className="AboutContainer">
      <div className="About">
        <Typography>
          <Title>Recurring Payments</Title>
          <Title level={2}>Overview</Title>
          <Paragraph>
            A list of transactions made by signed in wallet.
          </Paragraph>
          <Title level={2}>Contracts</Title>
          <Paragraph>
            A list of contracts wallet is participating in.
          </Paragraph>
          <Title level={2}>Create contract</Title>
          <Paragraph>
            With recurring payments 2 peers can construct a contract with recurring payment functionality. Every x amount
            of time the recipient can collect the tokens for the previous period. Short fee is the fee that goes to the
            recipient in case of early termination of the contract. Prepaid is the amount of payments needed before activation.
          </Paragraph>
          <Title level={2}>Review</Title>
          <Paragraph>
            With the review button you can review the contract and either update or accept the contract. When updating the
            contract the other party needs to review the contract.
          </Paragraph>
          <Title level={2}>Fund</Title>
          <Paragraph>
            With the fund button the sender of a contract can fund the contract for the recipient.
          </Paragraph>
          <Title level={2}>Withdraw</Title>
          <Paragraph>
            With the withdraw button the recipient of a contract can collect the available payments.
          </Paragraph>
          <Title level={2}>Terminate</Title>
          <Paragraph>
            With the terminate button the contract either on of the peers can terminate the contract after the prepaid time
            is passed. A predefined short fee will be settle the remaining contract balance between the contract sender and recipient.
          </Paragraph>
        </Typography>
      </div>
    </div>);
}
