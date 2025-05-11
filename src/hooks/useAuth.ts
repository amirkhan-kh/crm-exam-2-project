import { authApi } from './auth';
import { toast } from 'react-toastify';
import type  { AxiosError } from 'axios';

interface LoginPayload {
  phone_number: string;
  password: string;
}

export async function loginuser(user: LoginPayload): Promise<void> {
  console.log(localStorage.getItem('token'));
  
  try {
    const res = await authApi.post('/accounts/login/', user);
    const token = res.data.data.tokens.access;  
    

    if (token) {
      localStorage.setItem('token', token);
      toast.success('Muvaffaqiyatli login qilindi');
      window.location.href = '/'; 
    } else {
      toast.error('Token olinmadi');
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    toast.error(error.response?.data?.message || 'Login xatoligi');
    console.error('Login xatosi:', error.response?.data);
  }
}


interface User {
  full_name: string;
  gender: 'male' | 'female';
  phone_number: string;
  passport_number: string;
  jshshr: string;
  birth_date: string; 
  salary_type: 'official' | 'unofficial'; 
}

interface EmployeeData {
  id: number;
  user: User;
  user_full_name: string;
  user_role: 'employee' | 'admin' | 'manager'; 
  branch_name: string;
  position: string;
  salary: string; 
  official_salary: string; 
  start_time: string;
  end_time: string;  
}

export async function employeesBranchsId(user: EmployeeData): Promise<void>{

  try{
    const res = await authApi.post(`/employee/employees/branch/1/`, user)
    const token = res.data.data.tokens.access

    if(token){
      localStorage.setItem('token', token);
      
    } else{
      console.log("Erorni top");
      
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    toast.error(error.response?.data?.message || 'Login xatoligi');
    console.error('Login xatosi:', error.response?.data);
  }
}