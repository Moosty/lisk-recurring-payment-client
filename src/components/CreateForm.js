import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import './CreateForm.less';

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

  const setSender = (event) => {
    setSenderKey(event.target.value);
    if (event.target.value === "") {
      setRecipientDisabled(false);
    } else if (event.target.value !== publicKey) {
      form.setFieldsValue({recipient: publicKey})
      setRecipientDisabled(true);
    } else {
      setRecipientDisabled(false);
    }
  }

  const setRecipient = (event) => {
    setRecipientKey(event.target.value);
    if (event.target.value === "") {
      setSenderDisabled(false);
    } else if (event.target.value !== publicKey) {
      form.setFieldsValue({sender: publicKey})
      setSenderDisabled(true);
    } else {
      setSenderDisabled(false);
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      recipient: publicKey,
      sender: "267605ae23a157b0a82453fc48dd5c6adc25045c3a4a2a28dc6550a9518a2393",
      title: "test",
      unitAmount: 1,
      amount: "1.0000",
      unitType: "MONTHS",
      duration: 12,
      prepaid: 6,
      terminationFee: 2,
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
            onCreate(values, form.resetFields);
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
        <Form.Item
          label="Sender payments public key"
        >
          <Form.Item
            noStyle
            name="sender"
            rules={[
              {
                required: true,
                message: 'Please enter the senders public key of this recurring payment',
              },
            ]}
          >
            <Input
              value={sender}
              ref={senderInputRef}
              onChange={setSender}
              disabled={senderDisabled}/>
          </Form.Item>
          <a onClick={() => {
            form.setFieldsValue({sender: publicKey});
            recipientInputRef.current.focus();
          }}>Me</a>
        </Form.Item>
        <Form.Item
          label="Recipient payments public key"
        >
          <Form.Item
            noStyle
            name="recipient"
            rules={[
              {
                required: true,
                message: 'Please enter the recipients public key of this recurring payment',
              },
            ]}
          >
            <Input
              value={recipient}
              ref={recipientInputRef}
              onChange={setRecipient}
              disabled={recipientDisabled}/>
          </Form.Item>
          <a onClick={() => {
            form.setFieldsValue({recipient: publicKey});
            recipientInputRef.current.focus();
          }}>Me</a>
        </Form.Item>
        <Form.Item label="A payment unit is every" style={{marginBottom: 0}}>
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

        <Form.Item label="Contract duration in units">
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
          <span> &nbsp; Unit(s)</span>
        </Form.Item>


        <Form.Item label="Payment amount per unit" style={{marginBottom: 0}}>
          <Form.Item name="amount" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={0.0001} precision={4} value={2}/>
          </Form.Item>
          <span> &nbsp; TKN every unit</span>
        </Form.Item>

        <Form.Item label="Termination fee" style={{marginBottom: 0}}>
          <Form.Item name="terminationFee" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={0} precision={0} value={1}/>
          </Form.Item>
          <span> &nbsp; Unit(s)</span>
        </Form.Item>

        <Form.Item label="Minimal units to activate" style={{marginBottom: 0}}>
          <Form.Item name="prepaid" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={1} precision={0} initialValue={1}/>
          </Form.Item>
          <span> &nbsp; Unit(s)</span>
        </Form.Item>

        <Form.Item name="data" label="Data">
          <Input maxLength={64}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};
