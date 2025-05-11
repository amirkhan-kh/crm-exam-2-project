import React, { useState } from "react";
import logo from "../../../public/Logo.png";
import { Button, Image, Input } from "antd";
import { loginuser } from "../../hooks/useAuth";
import "./_style.scss"
import { Reval } from "../../motion";
const AuthLayout: React.FC = () => {
  const [phonenumber, setPhonenumber] = useState<string>("+998911111111");
  const [password, setPassword] = useState<string>("Nurillo123");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phonenumber || !password) {
      return alert("Barchasini to'ldir");
    }
    await loginuser({
      phone_number: phonenumber,
      password: password,
    });
  };
  return (
    <div className="flex items-center justify-center w-full ">
      <div id="large-header" className="large-header  w-[50%]">
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <div className=" flex items-center justify-center h-screen ">
      <Reval>
         <div className="flex items-center gap-4 h-56">
         <img src={logo} width={58} height={58} alt="logo" />
          <h1 className="text-2xl text-white">
            <strong>NovEnter</strong>
          </h1>
         </div>
      </Reval>
        </div>
      </div>
      <div className="w-[50%] flex items-center justify-center h-screen" >
        <form onSubmit={handleSubmit} className="w-[332px] text-center">
          <Image
            src={logo}
            width={58}
            height={58}
            alt="logo"
            className="mb-6"
          />
          <h1 className="text-[20px] font-semibol text-white">
            <strong>NovEnter</strong>
          </h1>
          <p className="text-[16px] font-normal mb-6 text-[#ffffff]">
            Crm tizim bilan biznesingizni rivojlantiring
          </p>
          <div className="mb-2">
            <Input
              placeholder="Telefon raqamingizni kiriting"
              className="py-2.5 px-4 text-[12px] font-semibold"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Input.Password
              placeholder="Parolingizni kiriting"
              className="py-2.5 px-4 text-[12px] font-semibold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="primary" htmlType="submit" className="w-full">
            Tizimga kirish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthLayout;
