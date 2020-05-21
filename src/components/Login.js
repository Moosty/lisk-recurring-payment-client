import React, { useEffect, useRef, useState } from 'react';
import {
  SyncOutlined,
} from '@ant-design/icons';
import { Mnemonic } from '@liskhq/lisk-passphrase';
import { Input, Form, Button, Row, Col } from 'antd';
import './Login.less';
import { useCheckName } from "../hooks/useCheckName";

const Login = ({passphrase, username, setPassphrase, setLogin, setUsername}) => {
  const [currentState, setCurrent] = useState(false);
  const [exist, canLogin] = useCheckName(username, passphrase, setUsername);
  const nameInput = useRef(null);

  const refreshPassphrase = () => {
    setUsername("");
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

  useEffect(() => {
    if (nameInput.current) {
      nameInput.current.focus();
    }
  }, [exist, canLogin]);

  return (

    <div className="login">
        <div className="wrapper">
  <svg className="triangle-canvas" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
    <polygon className="triangle triangle-1" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-2" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-3" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-4" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-5" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-6" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-7" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-8" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-9" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-10" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-11" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-12" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-13" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-14" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-15" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-16" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-17" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-18" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-19" points="500,200 759,650 241,650" />
    <polygon className="triangle triangle-20" points="500,200 759,650 241,650" />
  </svg>
</div>
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
            ref={nameInput}
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
