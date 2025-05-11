import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import AddedForm from "../form/add-employees";
import type { IBtn } from '../../../type/index';

const AddBtn: React.FC<IBtn> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log("Button clicked!");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Modal confirmed");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("Modal canceled");
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("isModalOpen before:", isModalOpen);
    if (isModalOpen) {
      console.log("Modal is now open.");
    } else {
      console.log("Modal is closed.");
    }
  }, [isModalOpen]); 
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {children}
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddedForm />
      </Modal>
    </>
  );
};

export default AddBtn;
