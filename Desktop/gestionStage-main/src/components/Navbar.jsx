import React from "react";
import "./Navbar.css";
import { FaSignOutAlt } from "react-icons/fa"; // Import de l'icône de déconnexion

const Navbar = () => {
  const handleLogout = () => {
    // Logique de déconnexion : redirection vers la page de login
    console.log("Déconnecté");
    window.location.href = "/LoginPage";
  };

  return (
    <div className="navbar">
      {/* Barre de recherche */}
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <span role="img" aria-label="search">
          🔍
        </span>
      </div>

      {/* Bouton de déconnexion sous forme d'icône */}
      <div className="logout-icon" onClick={handleLogout}>
        <FaSignOutAlt title="Logout" />
      </div>
    </div>
  );
};

export default Navbar;
