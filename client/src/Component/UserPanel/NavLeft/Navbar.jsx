import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './NavbarLeftSide.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    navigate('/login');
  };

  return (
    <div className="nav">
      <p style={{ fontSize: '40px', fontFamily: 'Poppins', fontWeight: '400' }}>EMPLOYEE MANAGEMENT SYSTEM</p>
      <button className="logout" onClick={handleLogout}>
        <FaSignOutAlt style={{ color: '#fff', fontSize: '20px', marginBottom: '1rem' }} />
      </button>
    </div>
  );
};

export default Navbar;
