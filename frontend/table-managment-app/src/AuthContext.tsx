import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { decodeToken, TokenPayload } from './utils/jwt';

interface AuthContextType {
  token: string | null;
  userName: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setUserName(decoded?.name || null);
      console.log('Decoded name:', decoded?.name);
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);

    const decoded = decodeToken(newToken);
    setUserName(decoded?.name || null);
  };

  const logout = () => {
    setToken(null);
    setUserName(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, userName, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
