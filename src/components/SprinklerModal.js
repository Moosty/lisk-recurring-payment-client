import React from 'react';
import './SprinklerModal.less';
import { Modal } from "antd";

export const SprinklerModal = ({visible, onClose, requestSprinkler, nonce}) => {

  const sprinkler = () => {
    requestSprinkler(nonce)
    onClose();
  }

  return <Modal
    width={600}
    visible={visible}
    title="Requesting tokens from faucet"
    okText="Request tokens"
    cancelText="No thanks"
    onOk={sprinkler}
    onCancel={onClose}
  >
    Your tokens will be requested through a faucet transaction.
  </Modal>;
}
