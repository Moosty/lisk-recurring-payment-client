import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import './CreateForm.less';
import { FindUser } from "./FindUser";

const {Option} = Select;
export const CreateForm = ({visible, onCreate, onCancel, publicKey}) => {
  const [form] = Form.useForm();
  const [recipient, setRecipientKey] = useState(publicKey);
  const [sender, setSenderKey] = useState("");
  const [senderDisabled, setSenderDisabled] = useState(false);
  const [recipientDisabled, setRecipientDisabled] = useState(false);
  const titleRef = useRef(null);
  const senderInputRef = useRef(null);
  const recipientInputRef = useRef(null);

  const setSender = (value) => {
    setSenderKey(value);
    if (value === "") {
      setRecipientDisabled(false);
    } else if (value !== publicKey) {
      form.setFieldsValue({recipient: publicKey})
      setRecipientKey(publicKey)
      setRecipientDisabled(true);
    } else {
      setRecipientDisabled(false);
    }
  }

  const setRecipient = (value) => {
    setRecipientKey(value);
    if (value === "") {
      setSenderDisabled(false);
    } else if (value !== publicKey) {
      form.setFieldsValue({sender: publicKey})
      setSenderKey(publicKey)
      setSenderDisabled(true);
    } else {
      setSenderDisabled(false);
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      recipient: "",
      sender: "",
      title: "",
      unitAmount: 1,
      amount: "1.0000",
      unitType: "",
      duration: 1,
      prepaid: 1,
      terminationFee: 0,
    })
  }, [])

  return (
    <Modal
      className="CreateModal"
      width={600}
      visible={visible}
      title="Create Recurring Payment Contract"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onCreate({ ...values, sender, recipient}, form.resetFields);
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
          label="Contract name"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter a recurring payment contract name',
            },
          ]}
        >
          <Input ref={titleRef}/>
        </Form.Item>
        <Form.Item label="Sender payments" >
          <FindUser setValue={setSender} value={sender} />
        </Form.Item>
        <Form.Item label="Recipient payments" >
          <FindUser setValue={setRecipient} value={recipient}/>
        </Form.Item>
        <Form.Item label="A payment will be every" style={{marginBottom: 0}}>
          <Form.Item name="unitAmount" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={1} precision={0} value={2}/>
          </Form.Item>
          <Form.Item name="unitType" style={{display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px'}}
                     rules={[
                       {
                         required: true,
                       },
                     ]}>
            <Select placeholder="Select unit type" className="select-after">
              <Option value="MINUTES">Minute(s)</Option>
              <Option value="HOURS">Hour(s)</Option>
              <Option value="DAYS">Day(s)</Option>
              <Option value="MONTHS">Month(s)</Option>
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Contract duration in payments">
          <Form.Item
            name="duration"
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={1} precision={0} value={12}/>
          </Form.Item>
          <span> &nbsp; payment(s)</span>
        </Form.Item>


        <Form.Item label="Token amount per payment" style={{marginBottom: 0}}>
          <Form.Item name="amount" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={0.0001} precision={4} value={2}/>
          </Form.Item>
          <span> &nbsp; TKN every payment</span>
        </Form.Item>

        <Form.Item label="Short fee" style={{marginBottom: 0}}>
          <Form.Item name="terminationFee" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={0} precision={0} value={1}/>
          </Form.Item>
          <span> &nbsp; payment(s)</span>
        </Form.Item>

        <Form.Item label="Minimal units to activate" style={{marginBottom: 0}}>
          <Form.Item name="prepaid" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={1} precision={0} initialValue={1}/>
          </Form.Item>
          <span> &nbsp; payment(s)</span>
        </Form.Item>

        <Form.Item name="data" label="Note">
          <Input maxLength={64}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
