import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import { useAdminAuth } from '../context/AdminAuthContext';
import '../styles/AdminDashboard.css';

const AdminLayout: React.FC = () => {
  const { adminUser, loading } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('dark');
    };
  }, [darkMode]);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  
  return (
    <div className="admin-panel-wrapper">
      <AdminSidebar isOpen={sidebarOpen} />
      <section id="content">
        <AdminNavbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default AdminLayout;
