// Komponent
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Select, Spin} from "antd";
import { fetchUser } from "../../store/create-slice.ts"; // userSlice'dan import qiling
import type { AppDispatch, RootState } from "../../store/store-config.ts";


const Employees: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch]);
  if (loading) return <div><Spin/></div>;
  if (error) return <div>Error: {error}</div>;
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <Button color="primary" variant="solid">+ Xodim qo'shish</Button>
        <div className="flex items-center gap-2">
          <Input  placeholder="Qidiruv"/>
          <Select
            defaultValue="Fillial tanlang"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Employees;
