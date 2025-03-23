"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api';

// Kullanıcı tipi
interface User {
  name: string;
  email: string;
}

// Context tipi
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Context oluşturma
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider bileşeni
export function AuthProvider({ children }: { children: ReactNode }) {
  // State tanımlamaları
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Sayfa yüklendiğinde oturum kontrolü
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setUser({
          name: 'Frontend Developer',
          email: 'frontendtask@secilstore.com'
        });
      }
    };

    checkAuth();
  }, []);

  // Giriş işlemi
  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.login({ username: email, password });
      
      setUser({
        name: 'Frontend Developer',
        email
      });
      
      router.push('/collections');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Çıkış işlemi
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  };

  // Context değerleri
  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth hook\'u AuthProvider içinde kullanılmalıdır');
  }
  
  return context;
} 