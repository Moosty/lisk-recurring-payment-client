import React from "react";
import locale from 'antd/es/date-picker/locale/en_US';
import { Modal, Form, Input, Radio, DatePicker, Select, InputNumber } from 'antd';

import './Wallet.less';

const {RangePicker} = DatePicker;
const {Option} = Select;
export const Create = ({visible, onCreate, onCancel, account}) => {
  const [form] = Form.useForm();
  const selectAfter = (
    <Select defaultValue="MINUTES" className="select-after">
      <Option value="MINUTES">Minute(s)</Option>
      <Option value="HOURS">Hour(s)</Option>
      <Option value="DAYS">Day(s)</Option>
      <Option value="MONTHS">Month(s)</Option>
    </Select>
  );
  return (
    <Modal
      width={600}
      visible={visible}
      title="Create Recurring Payment Contract"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="sender"
          label="Sender Public Key"
          rules={[
            {
              required: true,
              message: 'Please input the Sender Public Key of recurring payment!',
            },
          ]}
        >
          <Input defaultValue={account.publicKey}/>
        </Form.Item>
        <Form.Item
          name="recipient"
          label="Recipient Public Key"
          rules={[
            {
              required: true,
              message: 'Please input the Recipient Public Key of recurring payment!',
            },
          ]}
        >
          <Input defaultValue={account.otherPublicKey}/>
        </Form.Item>
        <Form.Item
          name="duration"
          label="Contract Duration">
          <RangePicker locale={locale} showTime/>
           &nbsp; (total payments: 12)
        </Form.Item>
        <Form.Item label="Payment Timespan" style={{marginBottom: 0}}
        >
          <Form.Item name="unitAmount" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber value={2} />
          </Form.Item>
          <Form.Item name="unitType" style={{display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px'}}>
            {selectAfter}
          </Form.Item>
        </Form.Item>

        <Form.Item label="Payment Amount" style={{marginBottom: 0}}>
          <Form.Item name="amount" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <Input defaultValue={2} suffix={`LSK`}/>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Termination fee" style={{marginBottom: 0}}>
          <Form.Item name="terminationFee" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <Input defaultValue={1} suffix={`Unit(s)`}/>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Prepaid units" style={{marginBottom: 0}}>
          <Form.Item name="prepaid" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <Input defaultValue={1} suffix={`Unit(s)`}/>
          </Form.Item>
        </Form.Item>

        <Form.Item name="data" label="Data">
          <Input type="textarea"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
