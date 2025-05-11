import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Select, Spin, Table } from "antd";
import type { AppDispatch, RootState } from "../../store/store-config";
import type { DataType } from "../../type/index";
import { fetchEmployeesByBranch } from "../../store/employees-slice";
import { columnsEmploye } from "../../db";
import AddBtn from "../../components/ui/modal-btns/add-employee";

const Employees: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error } = useSelector(
    (state: RootState) => state.employee
  );

  const [branchId, setBranchId] = useState<number | null>(1);
  const [selectedBranch, setSelectedBranch] = useState("1");
  console.log(setBranchId);
  
  const handleChange = (value: string) => {
    setSelectedBranch(value);
    dispatch(fetchEmployeesByBranch(parseInt(value)));
  };

  useEffect(() => {
    if (branchId !== null) {
      dispatch(fetchEmployeesByBranch(branchId));
    }
  }, [dispatch, branchId]);

  const tableData: DataType[] = Array.isArray(employees)
    ? employees.map((emp) => ({
        key: emp.id,
        name: (
          <p className="text-indigo-400 text-[12px] font-semibold flex items-center gap-2">
            {emp.user.full_name}
          </p>
        ),
        role: <p className="text-[12px] font-semibold">{emp.user_role}</p>,
        phone: (
          <p className="text-[12px] font-semibold">
            {emp.user?.phone_number || "Nomaʼlum"}
          </p>
        ),
        branch: (
          <p className="text-[12px] font-semibold">{emp.branch_name}</p>
        ),
        shift: (
          <p className="text-[12px] font-semibold">
            {emp.start_time} - {emp.end_time}
          </p>
        ),
        birth_date: emp.user?.birth_date || "Nomaʼlum",
      }))
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 font-semibold">Xatolik: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <AddBtn>+ Xodim qo'shish</AddBtn>

        <div className="flex items-center gap-2">
          <Input placeholder="Qidiruv" />
          <Select
            defaultValue={selectedBranch}
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: "1", label: "Uchtepa filiali" },
              { value: "2", label: "Chilonzor filiali" },
              { value: "3", label: "Yashnabod filiali" },
            ]}
          />
        </div>
      </div>
      <div>
        <Table<DataType>
          columns={columnsEmploye}
          dataSource={tableData}
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
    </div>
  );
};

export default Employees;
