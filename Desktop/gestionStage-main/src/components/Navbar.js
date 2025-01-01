import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">EMSI Gestion des Stages</div>
      <div className="navbar-right">
        <span className="user-name">Yasmine Ait Halibi</span>
        <button className="logout-button" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
