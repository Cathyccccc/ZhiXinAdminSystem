import React from 'react';
import { Modal } from 'antd';

export default function Dialog({isModalOpen, setIsModalOpen, title, width, className = '', render}) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal className={className} title={title} width={width} open={isModalOpen} onCancel={handleCancel} footer={null} destroyOnClose={true}>
      {render()}
    </Modal>
  )
}
