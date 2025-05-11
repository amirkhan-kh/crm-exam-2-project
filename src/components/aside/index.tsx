import React from "react";
import { navItems } from "../../db";
import { NavLink } from "react-router-dom";
import "./_style.scss";
import { Button } from "antd";
const Aside: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/auth'; 
  };
  return (
    <aside className="p-4 min-w-[254px] min-h-screen flex flex-col justify-between">
      <ul>
        {navItems.map((item, i) => {
          const Icon = item.icons;
          return (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) => (isActive ? "text-indigo-400" : "")}
            >
              <li className="py-2 px-7 flex items-center gap-2 text-[13px] font-semibold hover:bg-indigo-50 focus:bg-indigo-100 transition-[0.4s]">
                <Icon size={16} color="#525B73" />
                <p>{item.name}</p>
              </li>
            </NavLink>
          );
        })}
      </ul>
      <Button   onClick={handleLogout} className="absolute top-[-90px] ">Log Out</Button>
    </aside>
  );
};

export default Aside;
