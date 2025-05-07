import React from "react";
import { navItems } from "../../db";
import { NavLink } from "react-router-dom";
import "./_style.scss";
const Aside: React.FC = () => {
  return (
    <aside className="p-4 min-w-[254px] min-h-screen">
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
    </aside>
  );
};

export default Aside;
