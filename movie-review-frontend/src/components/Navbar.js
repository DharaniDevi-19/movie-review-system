import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <span role="img" aria-label="popcorn">🍿</span> CineReviews
        </div>
      </div>
      <div className="navbar-right">
        <Link to="/" className={isActive('/')}>Home</Link>
        {!token ? (
          <>
            <Link to="/login" className={isActive('/login')}>Login</Link>
            <Link to="/register" className={isActive('/register')}>Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
