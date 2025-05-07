// auth.ts ichida
import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://api.noventer.uz/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
