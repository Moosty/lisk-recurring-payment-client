import React, { useEffect } from 'react';
import {
  SyncOutlined,
} from '@ant-design/icons';
import { Mnemonic } from '@liskhq/lisk-passphrase';
import { Input, Form, Button, Row, Col } from 'antd';
import { useCheckName } from "../hooks/useCheckName";

const Login = ({passphrase, username, setPassphrase, setLogin, setUsername}) => {
  const [exist, canLogin] = useCheckName(username, passphrase, setUsername);

  const refreshPassphrase = () => {
    setPassphrase(Mnemonic.generateMnemonic());
  }

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  };

  return (
    <div className={`Login`}>
      <h1>Login</h1>
      <Form
        {...formItemLayout}
      >
        <Form.Item
          label="Passphrase"
        >
          <Row gutter={8}>
            <Col span={20}>
              <Form.Item noStyle>
                <Input
                  className="Passphrase"
                  value={passphrase}
                  onChange={(input) => setPassphrase(input.target.value)}/>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Button
                onClick={refreshPassphrase}
                type="primary"
                shape="circle"
                icon={<SyncOutlined/>}/>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          validateStatus={exist && !canLogin ? 'error' : "success"}
          help="Username should be unique"
          label="Username"
          hasFeedback={true}
        >
          <Input
            className="Username"
            value={username}
            disabled={exist && canLogin}
            onChange={(input) => setUsername(input.target.value)}/>
        </Form.Item>
        <br/>
        <Form.Item
          wrapperCol={{
            xs: {span: 24, offset: 4},
            sm: {span: 16, offset: 4},
          }}>
          <Button disabled={!canLogin} onClick={setLogin}>Login</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default React.memo(Login, (prevProps, nextProps) =>
  prevProps.passphrase === nextProps.passphrase &&
  prevProps.username === nextProps.username
);
