import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../store/store-config";
import { editShift } from "../../../../store/shift-edit";
import type { ShiftPayload } from "../../../../type";
import { Button, Input } from "antd";
interface EditFormProps {
  shift: ShiftPayload & { id: number };
  onSuccess?: () => void; 
}
const EditForm: React.FC<EditFormProps> = ({ shift, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.shifts.error);

  const [name, setName] = useState(shift.name);
  const [startTime, setStartTime] = useState(shift.start_time);
  const [endTime, setEndTime] = useState(shift.end_time);
  const [branch, setBranch] = useState<string | number>(shift.branch);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (shift.id === undefined) {
      console.error("Shift ID yo'q — yangilash mumkin emas");
      return;
    }

    const updatedData: ShiftPayload = {
      name,
      start_time: startTime,
      end_time: endTime,
      branch,
    };

    setLoading(true);
    try {
      await dispatch(editShift(shift.id, updatedData))
      if (onSuccess) onSuccess(); 
    } catch (err) {
      console.error("Xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleEdit} className="flex flex-col gap-2">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Smena nomi"
        required
      />
      <Input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <Input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <Input
        type="text"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        placeholder="Filial ID"
        required
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Button type="primary" htmlType="submit" loading={loading}>
        Yangilash
      </Button>
    </form>
  );
};

export default EditForm;
