import { TbUsersGroup } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegChartBar } from "react-icons/fa6";

import type { IconType } from "react-icons";

interface NavItem {
    path: string;
    name: string;
    icons: IconType;// E'tibor bering!
  }
export const navItems: NavItem[] = [
    
    {
        path: "/employees",
        name: "Xodimlar ro'yxati",
        icons: TbUsersGroup
        
    },
    {
        path: "/clients",
        name: "Mijozlar",
        icons: TbUsersGroup
    },
    {
        path: "/departments",
        name: "Bo'limlar",
        icons: AiOutlineHome
    },
    {
        path: "/smenalar",
        name: "Smenalar",
        icons: FaRegChartBar
    },
   
]