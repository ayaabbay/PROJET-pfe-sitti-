import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const Sidebar = ({ onMenuClick }) => {
  const [activeMenu, setActiveMenu] = useState(null); // Gestion flexible des sous-menus

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
    if (menuName !== "Professeur") {
      onMenuClick(menuName); // Appelle uniquement pour les menus non-déroulants
    }
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Emsi Stage</h2>

      <ul className="menu">
        {/* Home */}
        <li role="button" onClick={() => onMenuClick("")}>
          🏠 Home
        </li>

        {/* Menu Professeur */}
        <li
          className="dropdown"
          role="button"
          onClick={() => toggleMenu("Professeur")}
        >
          <span>
            👨‍🏫 Professeur {activeMenu === "Professeur" ? "▲" : "▼"}
          </span>
          {activeMenu === "Professeur" && (
            <ul className="submenu">
              <li role="button" onClick={() => onMenuClick("NosProfesseurs")}>
                👨‍🏫 Nos Professeurs
              </li>
              <li role="button" onClick={() => onMenuClick("Encadrant")}>
                👨‍🏫 Encadrant
              </li>
              <li role="button" onClick={() => onMenuClick("President")}>
                👔 Président
              </li>
              <li role="button" onClick={() => onMenuClick("Examinateur")}>
                📝 Examinateur
              </li>
              <li role="button" onClick={() => onMenuClick("Rapporteur")}>
                📑 Rapporteur
              </li>
            </ul>
          )}
        </li>

        {/* Étudiant */}
        <li role="button" onClick={() => onMenuClick("Etudiant")}>
          👩‍💻 Étudiants
        </li>

        {/* Assignement */}
        <li role="button" onClick={() => onMenuClick("Assignement")}>
          📝 Assignement
        </li>

        {/* Help */}
        <li role="button" onClick={() => onMenuClick("Help")}>
          <FaQuestionCircle style={{ marginRight: "8px" }} />
          Help
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
