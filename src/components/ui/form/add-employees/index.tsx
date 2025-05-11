import React, { useEffect, useState } from "react";
import { Input, Select, Button, message } from "antd";
import type { ICreateEmployee } from "../../../../type";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { addNewEmployee, resetEmployeeStatus } from "../../../../store/create-employees";
import type { RootState } from "../../../../store/store-config";
import { fetchEmployeesByBranch } from '../../../../store/employees-slice/index';
import { useSelector } from "react-redux";
import type { AxiosError } from "axios";

const AddedForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state: RootState) => state.employeedAdd);
  console.log(success);
  
  const [branchId, setBranchId] = useState<number | null>(1); 
  console.log(setBranchId);
  

  const employees = useSelector((state: RootState) => state.employee.employees);

  
  console.log(employees);
  
 


  const [form, setForm] = useState<ICreateEmployee>({
    user: {
      full_name: "",
      gender: "male",
      phone_number: "",
      passport_number: "",
      jshshr: "",
      birth_date: "",
      salary_type: "noofficial",
    },
    branch_id: 3,
    department_id: 1,
    shift_id: 3,
    position: "employee",
    salary: "",
    official_salary: "",
  });

  const handleInput = (key: keyof ICreateEmployee["user"], value: string) => {
    setForm(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [key]: value,
      },
    }));
  };

  const handleSelect = (key: keyof Omit<ICreateEmployee, "user">, value: number | string) => {
    setForm(prev => ({...prev,[key]: value}))};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!form.user.full_name || !form.user.phone_number || !form.user.passport_number || !form.user.jshshr || !form.user.birth_date) {
      message.error('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
      return;
    }
  
    const employeeData = {
      ...form,
      user: {
        ...form.user,
        full_name: form.user.full_name.trim(),
        phone_number: form.user.phone_number.trim(),
        passport_number: form.user.passport_number.trim(),
        jshshr: form.user.jshshr.trim(),
        birth_date: form.user.birth_date,
      },
      salary: form.salary,
      official_salary: form.official_salary,
    };
    
  
    try {
      dispatch(addNewEmployee(employeeData))
      message.success('Xodim muvaffaqiyatli qo‘shildi!');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      return(error.message)
    }
  };
  

  useEffect(() => {
    if (success) {
      message.success("Xodim muvaffaqiyatli qo‘shildi!");
      dispatch(resetEmployeeStatus());
      setForm({
        user: {
          full_name: "",
          gender: "male",
          phone_number: "",
          passport_number: "",
          jshshr: "",
          birth_date: "",
          salary_type: "noofficial",
        },
        branch_id: 1,
        department_id: 1,
        shift_id: 1,
        position: "employee",
        salary: "0",
        official_salary: "0",
      });
    }
    if (error) {
      message.error(error);
    }
  
    if (branchId !== null) {
      dispatch(fetchEmployeesByBranch(branchId));
    }
  
    return () => {
      dispatch(resetEmployeeStatus());
    };
  }, [dispatch, success, error, branchId]);
  


  return (
    <div className="addedForm">
      <form onSubmit={handleSubmit}>
        <h3>Shaxsiy ma'lumot</h3>
        <label>
          <p>F.I.SH</p>
          <Input
            value={form.user.full_name}
            onChange={(e) => handleInput("full_name", e.target.value)}
          />
        </label>
        <label>
          <p>Jinsi</p>
          <Select
            value={form.user.gender}
            onChange={(val) => handleInput("gender", val)}
            options={[
              { value: "male", label: "Erkak" },
              { value: "female", label: "Ayol" },
            ]}
          />
        </label>
        <label>
          <p>Telefon raqam</p>
          <Input
            value={form.user.phone_number}
            onChange={(e) => handleInput("phone_number", e.target.value)}
          />
        </label>
        <label>
          <p>Pasport raqami</p>
          <Input
            value={form.user.passport_number}
            onChange={(e) => handleInput("passport_number", e.target.value)}
          />
        </label>
        <label>
          <p>JSHSHR</p>
          <Input
            value={form.user.jshshr}
            onChange={(e) => handleInput("jshshr", e.target.value)}
          />
        </label>
        <label>
          <p>Tug‘ilgan sana</p>
          <Input
            type="date"
            value={form.user.birth_date}
            onChange={(e) => handleInput("birth_date", e.target.value)}
          />
        </label>
        <Select
          value={form.official_salary}
          onChange={(val) => handleSelect("branch_id", val)}
          options={[{ value: 1, label: "1-filial" }]}
        />
      

        <h3>Tashkilot uchun</h3>
        <Select
          value={form.branch_id}
          onChange={(val) => handleSelect("branch_id", val)}
          options={[{ value: 1, label: "1-filial" }]}
        />
        <Select
          value={form.department_id}
          onChange={(val) => handleSelect("department_id", val)}
          options={[{ value: 1, label: "1-bo‘lim" }]}
        />
        <Select
          value={form.shift_id}
          onChange={(val) => handleSelect("shift_id", val)}
          options={[{ value: 1, label: "1-smena" }]}
        />
        <Input
          placeholder="Lavozim"
          value={form.position}
          onChange={(e) => handleSelect("position", e.target.value)}
        />

        <label>
          <p>Norasmiy oylik</p>
          <Input
            value={form.salary}
            onChange={(e) => handleSelect("salary", e.target.value)}
          />
        </label>
        <label>
          <p>Rasmiy oylik</p>
          <Input
            value={form.official_salary}
            onChange={(e) => handleSelect("official_salary", e.target.value)}
          />
        </label>

        <Button type="primary"  loading={loading}>
          Saqlash
        </Button>
      </form>
    </div>
  );
};

export default AddedForm;
