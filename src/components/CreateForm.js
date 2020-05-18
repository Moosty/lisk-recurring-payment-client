import React from "react";
import locale from 'antd/es/date-picker/locale/en_US';
import { Modal, Form, Input, Radio, DatePicker, Select, InputNumber } from 'antd';


const {RangePicker} = DatePicker;
const {Option} = Select;
export const CreateForm = ({visible, onCreate, onCancel, account}) => {
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
          label="Sender payments"
          rules={[
            {
              required: true,
              message: 'Please enter the Sender of this recurring payment',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="recipient"
          label="Recipient payments"
          rules={[
            {
              required: true,
              message: 'Please enter the Recipient of this recurring payment',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="A payment unit is every" style={{marginBottom: 0}}>
          <Form.Item name="unitAmount" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber precision={0} value={2} />
          </Form.Item>
          <Form.Item name="unitType" style={{display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px'}}>
            {selectAfter}
          </Form.Item>
        </Form.Item>

        <Form.Item
          name="duration"
          label="Contract duration in units">
          <InputNumber precision={0} /> &nbsp; Unit(s)
        </Form.Item>

        <Form.Item label="Payment amount per unit" style={{marginBottom: 0}}>
          <Form.Item name="amount" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber precision={8} defaultValue={2} />
            &nbsp; TKN every unit
          </Form.Item>
        </Form.Item>

        <Form.Item label="Termination fee" style={{marginBottom: 0}}>
          <Form.Item name="terminationFee" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber precision={0} defaultValue={1} /> &nbsp; Unit(s)
          </Form.Item>
        </Form.Item>

        <Form.Item label="Minimal units to activate" style={{marginBottom: 0}}>
          <Form.Item name="prepaid" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber precision={0} defaultValue={1} /> &nbsp; Unit(s)
          </Form.Item>
        </Form.Item>

        <Form.Item name="data" label="Data">
          <Input maxLength={64}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
