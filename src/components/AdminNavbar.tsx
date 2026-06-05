import React from 'react';

interface AdminNavbarProps {
  toggleSidebar: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ toggleSidebar, darkMode, setDarkMode }) => {
  return (
    <nav>
      <i className="bx bx-menu" onClick={toggleSidebar}></i>
      <a href="#" className="nav-link">Categories</a>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>
      <input
        type="checkbox"
        id="switch-mode"
        hidden
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <label htmlFor="switch-mode" className="switch-mode"></label>
      <a href="#" className="notification">
        <i className="bx bxs-bell"></i>
        <span className="num">3</span>
      </a>
      <a href="#" className="profile">
        <img src="https://i.ibb.co/2kR4XvG/user.png" alt="profile" />
      </a>
    </nav>
  );
};

export default AdminNavbar;
