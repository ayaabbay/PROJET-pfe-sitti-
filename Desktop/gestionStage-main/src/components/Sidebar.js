import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ onMenuClick }) {
  const [professeursOpen, setProfesseursOpen] = useState(false);

  const handleProfesseursClick = () => {
    setProfesseursOpen(!professeursOpen);
  };

  return (
    <div className="sidebar">
      <div className="menu-item" onClick={() => onMenuClick("Dashboard")}>
        <span>🏠 Dashboard</span>
      </div>

      <div className={`menu-item has-submenu ${professeursOpen ? 'open' : ''}`} onClick={handleProfesseursClick}>
        <span>👨‍🏫 Professeurs</span>
      </div>
      {professeursOpen && (
        <div className={`submenu ${professeursOpen ? 'open' : ''}`}>
          <div className="menu-item" onClick={() => onMenuClick("Examinateurs")}>
            <span>🔍 Examinateur</span>
          </div>
          <div className="menu-item" onClick={() => onMenuClick("Rapporteurs")}>
            <span>📋 Rapporteur</span>
          </div>
          <div className="menu-item" onClick={() => onMenuClick("President")}>
            <span>👑 Président</span>
          </div>
          <div className="menu-item" onClick={() => onMenuClick("Encadrants")}>
            <span>👨‍💼 Encadrant</span>
          </div>
        </div>
      )}

      <div className="menu-item" onClick={() => onMenuClick("NosEtudiants")}>
        <span>👨‍🎓 Nos Étudiants</span>
      </div>

      <div className="menu-item" onClick={() => onMenuClick("NosStages")}>
        <span>📚 Nos Stages</span>
      </div>

      <div className="menu-item" onClick={() => onMenuClick("Templates")}>
        <span>📝 Templates</span>
      </div>
    </div>
  );
}

export default Sidebar;
