import React, { useState } from "react";
import type { IBtn } from "../../../type";
import { Button, Modal } from "antd";
import ShiftsForm from "../form/shifts-form";

const ShiftsBtn: React.FC<IBtn> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseAndRefresh = () => {
    setIsModalOpen(false);
    window.location.reload(); 
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {children}
      </Button>
      <Modal
        title="Yangi smena qo‘shish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ShiftsForm onSuccess={handleCloseAndRefresh} />
      </Modal>
    </>
  );
};

export default React.memo(ShiftsBtn); 