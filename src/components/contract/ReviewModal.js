/* global BigInt */
import React, { useEffect, useRef, useState } from "react";
import _ from 'lodash';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import './ReviewModal.less';

const {Option} = Select;
export const ReviewModal = ({visible, onReview, onCancel, publicKey, contract}) => {
  const [form] = Form.useForm();
  const [isUpdated, setUpdated] = useState(false);
  const [updates, switchUpdates] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      unitAmount: contract.asset.unit.typeAmount,
      amount: (BigInt(contract.asset.unit.amount) / BigInt(10 ** 8)).toString(),
      unitType: contract.asset.unit.type,
      duration: contract.asset.unit.total,
      prepaid: contract.asset.unit.prepaid,
      terminationFee: contract.asset.unit.terminateFee,
    })
    switchUpdates(!updates)
  }, [visible])

  useEffect(() => {
    const data = form.getFieldsValue([
      'unitAmount', 'amount', 'unitType', 'duration', 'prepaid', 'terminationFee'
    ]);
    const unit = {
      typeAmount: data.unitAmount,
      amount: (BigInt(data.amount) * BigInt(10 ** 8)).toString(),
      type: data.unitType,
      total: data.duration,
      prepaid: data.prepaid,
      terminateFee: data.terminationFee,
    };
    setUpdated(false);
    _.map(unit, (value, key) => {
      if (value !== contract.asset.unit[key]) {
        setUpdated(true);
      }
    })
  }, [updates])

  return (
    <Modal
      className="ReviewModal"
      width={600}
      visible={visible}
      title="Review Recurring Payment Contract"
      okText={isUpdated ? "Update" : "Accept"}
      cancelText="Cancel"
      onCancel={() => {
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onReview(values);
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
        <Form.Item label="A payment unit is every" style={{marginBottom: 0}}>
          <Form.Item name="unitAmount" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={1} precision={0} value={2} onChange={() => switchUpdates(!updates)}/>
          </Form.Item>
          <Form.Item name="unitType" style={{display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px'}}
                     rules={[
                       {
                         required: true,
                       },
                     ]}>
            <Select placeholder="Select unit type" className="select-after" onChange={() => switchUpdates(!updates)}>
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
            <InputNumber min={1} precision={0} value={12} onChange={() => switchUpdates(!updates)}/>
          </Form.Item>
          <span> &nbsp; Unit(s)</span>
        </Form.Item>


        <Form.Item label="Payment amount per unit" style={{marginBottom: 0}}>
          <Form.Item name="amount" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={0.0001} precision={4} value={2} onChange={() => switchUpdates(!updates)}/>
          </Form.Item>
          <span> &nbsp; TKN every unit</span>
        </Form.Item>

        <Form.Item label="Termination fee" style={{marginBottom: 0}}>
          <Form.Item name="terminationFee" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={0} precision={0} value={1} onChange={() => switchUpdates(!updates)}/>
          </Form.Item>
          <span> &nbsp; Unit(s)</span>
        </Form.Item>

        <Form.Item label="Minimal units to activate" style={{marginBottom: 0}}>
          <Form.Item name="prepaid" style={{display: 'inline-block'}} rules={[
            {
              required: true,
            },
          ]}>
            <InputNumber min={1} precision={0} initialValue={1} onChange={() => switchUpdates(!updates)}/>
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
