import { Button, Modal } from "antd";
import React, { useState } from "react";
import type { IBtn } from "../../../type/index";
import ClientFrorm from "../form/add-clients";

const AddClient: React.FC<IBtn> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {children}
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ClientFrorm/>
      </Modal>
    </>
  );
};

export default AddClient;
