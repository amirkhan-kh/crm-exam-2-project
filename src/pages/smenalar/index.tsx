import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store-config";
import { fetchShifts } from "../../store/shif-slice";
import { Button, Input, Select, Spin, Table } from "antd";
import type { DataTypeShifts, TShifts } from "../../type";
import { columnsShiftsDefinition } from "../../db";
import ShiftsBtn from "../../components/ui/modal-btns/shifts";
import { CiFileOff } from "react-icons/ci";
import { deleteShift } from "../../store/shif-delete";
import EditModal from "../../components/ui/modal-btns/shif-edit-modal";
const Attendace: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shifts, loading, error } = useSelector((state: RootState) => state.shifts);
  const [branchID, setBranchID] = useState<number>(1);
  const [selectedBranch, setSelectedBranch] = useState("1");
  console.log(setBranchID);
  
  useEffect(() => {
    dispatch(fetchShifts(branchID));
  }, [dispatch, branchID]);

  const handleChangeShifts = (value: string) => {
    setSelectedBranch(value);
    dispatch(fetchShifts(parseInt(value)));
  };

  const handleDelete = async(id: number) => {
    await dispatch(deleteShift(id));
    dispatch(fetchShifts(branchID));
    console.log("o'chirildi");
  };

  const culumnsShifts: TShifts[] = Array.isArray(shifts) ? shifts.map((item) => ({
    key: item.id,
    id: item.id,
    name: <p className="text-indigo-400 text-[12px] font-semibold flex items-center gap-2">{item.name}</p>,
    branch: <p className="text-[12px] font-semibold">{item.branch}</p>,
    branch_name: <p className="text-[12px] font-semibold">{item.branch_name}</p>,
    start_time: <p className="text-[12px] font-semibold">{item.start_time}</p>,
    end_time: <p className="text-[12px] font-semibold">{item.end_time}</p>,
    created_at: <p className="text-[12px] font-semibold"><Button onClick={() => handleDelete(item.id)} color="danger" variant="solid"><CiFileOff /></Button></p>,
    updated_at: <p className="text-[12px] font-semibold"><EditModal shift={item} /></p>, 
  })) : [];

  if (loading) return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <ShiftsBtn>+ Smenalar</ShiftsBtn>
        <div className="flex items-center gap-2">
          <Input placeholder="Qidiruv" />
          <Select
            defaultValue={selectedBranch}
            style={{ width: 200 }}
            onChange={handleChangeShifts}
            options={[
              { value: "1", label: "Uchtepa filiali" },
              { value: "2", label: "Chilonzor filiali" },
              { value: "3", label: "Yashnabod filiali" },
            ]}
          />
        </div>
      </div>
      <Table<DataTypeShifts>
        columns={columnsShiftsDefinition}
        dataSource={culumnsShifts}
        pagination={{
          pageSize: 6,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} / ${total} ta xodim`,
          onChange: (page, pageSize) => {
            console.log("Sahifa o'zgardi:", page, "Hajmi:", pageSize);
          
          },
        }}
      />
    </div>
  );
};

export default Attendace;
