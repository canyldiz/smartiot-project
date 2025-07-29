// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="brand-bold">Smart</span>IoT
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            SmartIoT
          </Link>
        </li>
        <li>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>
            What is IoT?
          </Link>
        </li>
        <li>
          <Link to="/devices" className={isActive('/devices') ? 'active' : ''}>
            Devices
          </Link>
        </li>
        <li>
          <Link to="/login" className={isActive('/login') ? 'active' : ''}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className={isActive('/register') ? 'active' : ''}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
