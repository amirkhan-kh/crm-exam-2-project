import { Input, Select, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/store-config";
import {
  createShift,
  resetShiftStatus,
} from "../../../../store/shif-post/post";
import type { ShiftPayload } from "../../../../type";
import type { AxiosError } from "axios";
import type { FetchUserError } from "../../../../store/create-slice";

interface ShiftsFormProps {
  onSuccess?: () => void;
}

const ShiftsForm: React.FC<ShiftsFormProps> = ({ onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("1");

  const { success, error } = useSelector((state: RootState) => state.shiftPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !startTime || !endTime || !selectedBranch) {
      message.error("Barcha maydonlarni to‘ldiring");
      return;
    }

    const shiftPayload: ShiftPayload = {
      name,
      start_time: startTime,
      end_time: endTime,
      branch: parseInt(selectedBranch),
    };

    try {
      await dispatch(createShift(shiftPayload));
      dispatch(resetShiftStatus());
    } catch (err) {
      const error = err as AxiosError<FetchUserError>;
      console.log("xatolik", error);
      
    }
  };

  useEffect(() => {
    if (success) {
      message.success("Smena muvaffaqiyatli yaratildi");
      if (onSuccess) onSuccess(); 
    }
    if (error) {
      message.error(error);
    }
  }, [success, error]);

  const handleChangeShifts = (value: string) => {
    setSelectedBranch(value);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="Smena nomi"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select
        value={selectedBranch}
        style={{ width: "100%" }}
        onChange={handleChangeShifts}
        options={[
          { value: "1", label: "Uchtepa filiali" },
          { value: "2", label: "Chilonzor filiali" },
          { value: "3", label: "Yashnabod filiali" },
        ]}
      />
      <Input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <Input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <Button htmlType="submit" type="primary">
        Yaratish
      </Button>
    </form>
  );
};

export default ShiftsForm;
