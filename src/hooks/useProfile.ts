// lib/useProfile.ts
import { useEffect, useState } from 'react';
import { authApi } from './auth';

export interface UserProfile {
  id?: number;
  full_name?: string;
  phone_number?: string;
  email?: string;
  [key: string]: unknown;
}

export function useProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    authApi
      .get<UserProfile>('/accounts/me/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Profil xatosi:', err))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
