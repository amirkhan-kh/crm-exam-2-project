import { Button, Modal } from "antd";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import EditForm from "../../form/edit-form";
import type { ShiftPayload } from "../../../../type";
import { useDispatch } from "react-redux";
import { fetchShifts } from "../../../../store/shif-slice";
import type { AppDispatch } from "../../../../store/store-config";

interface EditModalProps {
  shift: ShiftPayload & { id: number };
}
const EditModal: React.FC<EditModalProps> = ({ shift }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    setIsModalOpen(false); 
    dispatch(fetchShifts(shift.branch as number)); 
  };

  return (
    <>
      <Button onClick={showModal}>
        <CiEdit />
      </Button>
      <Modal
        title="Ma'lumotni o'zgartirish"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <EditForm shift={shift} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
};

export default EditModal;
