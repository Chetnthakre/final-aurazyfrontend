import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogout } = useAdminAuth();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    adminLogout();
    navigate('/adminarea');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: 'bx bxs-dashboard', text: 'Dashboard' },
    { path: '/admin/products', icon: 'bx bxs-shopping-bag-alt', text: 'Products' },
    { path: '/admin/orders', icon: 'bx bxs-cart', text: 'Orders' },
    { path: '/admin/users', icon: 'bx bxs-user', text: 'Users' },
    { path: '/admin/analytics', icon: 'bx bxs-bar-chart-alt-2', text: 'Analytics' },
  ];

  return (
    <section id="sidebar" className={!isOpen ? "hide" : ""}>
      <Link to="/admin/dashboard" className="brand">
        <i className="bx bxs-dashboard"></i>
        <span className="text">Aurazy Admin</span>
      </Link>

      <ul className="side-menu top">
        {menuItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
            <Link to={item.path}>
              <i className={item.icon}></i>
              <span className="text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="side-menu">
        <li>
          <Link to="/admin/settings">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </Link>
        </li>
        <li>
          <a href="#" className="logout" onClick={handleLogout}>
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default AdminSidebar;
