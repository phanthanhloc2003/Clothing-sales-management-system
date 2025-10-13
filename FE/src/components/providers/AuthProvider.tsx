"use client";
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setToken, setUser, logout } from '@/store/authSlice';
import { authService } from '@/services/auth';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        try {
          const response = await authService.getCurrentUser();
          if (response.success && response.data) {
            dispatch(setToken(token));
            dispatch(setUser(response.data));
          } else {
            localStorage.removeItem('accessToken');
            dispatch(logout());
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          localStorage.removeItem('accessToken');
          dispatch(logout());
        }
      }
    };

    fetchUser();
  }, [dispatch]);

  return <>{children}</>;
}