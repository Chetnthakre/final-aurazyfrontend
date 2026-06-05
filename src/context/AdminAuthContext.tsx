import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserProfile } from '../api';

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  loading: boolean;
  adminLogin: (userData: AdminUser, token: string) => void;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAdminAuth = async () => {
      const token = localStorage.getItem('adminToken');
      const savedAdmin = localStorage.getItem('adminUser');

      if (token && savedAdmin) {
        const parsedAdmin = JSON.parse(savedAdmin);
        if (parsedAdmin.isAdmin) {
          setIsAdminLoggedIn(true);
          setAdminUser(parsedAdmin);
          
          try {
            // Verify token with backend
            // We can use fetchUserProfile but we must ensure the API interceptor uses adminToken
            const { data } = await fetchUserProfile();
            if (data.isAdmin) {
              setAdminUser(data);
              localStorage.setItem('adminUser', JSON.stringify(data));
            } else {
              adminLogout();
            }
          } catch (err) {
            console.error("Admin session expired or invalid", err);
            adminLogout();
          }
        } else {
          adminLogout();
        }
      }
      setLoading(false);
    };

    initializeAdminAuth();
  }, []);

  const adminLogin = (userData: AdminUser, token: string) => {
    setIsAdminLoggedIn(true);
    setAdminUser(userData);
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(userData));
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, adminUser, loading, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
