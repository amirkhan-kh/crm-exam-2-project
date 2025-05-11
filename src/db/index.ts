import { TbUsersGroup } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegChartBar } from "react-icons/fa6";

import type { IconType } from "react-icons";
import type { TableColumnsType } from "antd";
import type { DataType } from "../type";
import type { ColumnsType } from "antd/es/table";
import type { DataTypeShifts } from "../type";
interface NavItem {
  path: string;
  name: string;
  icons: IconType; 
}
export const navItems: NavItem[] = [
  {
    path: "/employees",
    name: "Xodimlar ro'yxati",
    icons: TbUsersGroup,
  },
  {
    path: "/clients",
    name: "Mijozlar",
    icons: TbUsersGroup,
  },
  {
    path: "/departments",
    name: "Bo'limlar",
    icons: AiOutlineHome,
  },
  {
    path: "/smenalar",
    name: "Smenalar",
    icons: FaRegChartBar,
  },
];
export const columnsEmploye: TableColumnsType<DataType> = [
  {
    title: "F.I.SH",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "ROLE",
    dataIndex: "role",
  },
  {
    title: "PHONE",
    dataIndex: "phone",
  },
  {
    title: "ISHGA QABUL QILUVCHI FILIAL",
    dataIndex: "branch",
  },
  {
    title: "SMENASI",
    dataIndex: "shift",
  },
  {
    title: 'TUG"ILGAN SANASI',
    dataIndex: "birth_date",
  },
];

export const columnsClients: TableColumnsType<DataType> = [
  {
    title: "F.I.SH",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "MOBILE NUMBER",
    dataIndex: "role",
  },
  {
    title: "CITY",
    dataIndex: "phone",
  },
  {
    title:"FILIAL NOMI",
    dataIndex: "branch",
  },
  {
    title: "LITSENZIYA",
    dataIndex: "shift",
  },
  {
    title: 'YARATILGAN VAQTI',
    dataIndex: "birth_date",
  },
];
export const columnsShiftsDefinition: ColumnsType<DataTypeShifts> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    key: 'branch',
  },
  {
    title: 'Branch Name',
    dataIndex: 'branch_name',
    key: 'branch_name',
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'start_time',
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'end_time',
  },
  {
    title: "O'chirish",
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: "O'zgartirish",
    dataIndex: 'updated_at',
    key: 'updated_at',
  },
];
