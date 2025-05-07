// lib/loginuser.ts
import { authApi } from './auth';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface LoginPayload {
  phone_number: string;
  password: string;
}

export async function loginuser(user: LoginPayload): Promise<void> {
  
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
