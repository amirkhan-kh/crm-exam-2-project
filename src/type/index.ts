import type { JSX } from "react";
import type React from "react";

export interface IUser {
    id?: number;
    full_name?: string;
    gender?: string;
    birth_date?: string;
    role?: string;
    face_id?: null;
    company_id?: number;
    avatar?: string;
    salary_type?: string;
    email: string
  }
  
  export interface IUserState {
    loading: boolean;
    error: string | null;
    success: boolean; 
    user: IUser | null
    
  }
  export interface IEmployee {
    id: number;
  user: {
    full_name: string;
    phone_number?: string;
    birth_date?: string;
  };
  user_role: string;
  branch_name: string;
  start_time: string; 
  end_time: string; 

  }
  
  export interface IEmployeeState {
    employees: IEmployee[] | number | string;
    loading: boolean;
    error: string | null;
  }
  export interface DataType {
    key: React.Key ;
    name?: React.ReactNode | string;
    phone?:React.ReactNode;
    branch?:React.ReactNode;
    role?:React.ReactNode;
    birth_date?: React.ReactNode;
    shift?: React.ReactNode;
    litsenziya?: React.ReactNode;
    city?: React.ReactNode
    status?: React.ReactNode
  }


  export interface DataTypeEmploye {
    key: React.Key | number | string;
    name: JSX.Element;
    role: JSX.Element;
    phone: JSX.Element;
    branch: JSX.Element;
    shift: JSX.Element;
    birth_date: JSX.Element;
    litsenziya?:JSX.Element;
  }
  export interface IClient {
    id: number;
    branch: number | null;
    branch_name?: string;
    name: string;
    phone: string;
    avatar: string | null;
    license_file: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface IClientState {
    clients: IClient[];
    loading: boolean;
    error: string | null;
  }
  
  export interface ICreateEmployee {
    user: {
      full_name: string;
      gender: 'male' | 'female';
      phone_number: string;
      passport_number: string;
      jshshr: string;
      birth_date: string; 
      salary_type: 'official' | 'noofficial';
    };
    branch_id: number;
    department_id: number;
    shift_id: number;
    position: string;
    salary: string;
    official_salary: string;
  }
export interface IShift {
    id: number;
    name: string;
    branch: number;
    branch_name: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
  }
export interface ShiftsState {
    shifts: IShift[] | null;
    loading: boolean;
    error: string | null;
}

export interface IShifError {
  message?: string
}

export type TShifts = {
  id: React.Key | number | string;
  name: JSX.Element;
  branch: JSX.Element;
  branch_name: JSX.Element;
  start_time: JSX.Element;
  end_time: JSX.Element;
  created_at: JSX.Element;
  updated_at: JSX.Element;
}

export interface DataTypeShifts {
  id: React.Key | number | string;
  name: JSX.Element;
  branch: JSX.Element;
  branch_name: JSX.Element;
  start_time: JSX.Element;
  end_time: JSX.Element;
  created_at: JSX.Element;
  updated_at: JSX.Element;
}
export interface IBtn {
    children:  string
}

export interface ShiftPayload {
  id?: number;
  name: string ;
  start_time: string;
  end_time: string;
  branch: number | string
}