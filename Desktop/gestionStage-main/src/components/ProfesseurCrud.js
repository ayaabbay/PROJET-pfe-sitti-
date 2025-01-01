import React, { useState } from "react";
import "./ProfesseurCrud.css";

const ProfesseurCrud = () => {
  const [activeMenu, setActiveMenu] = useState(null); // État pour gérer les sous-menus

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <div>
      <h1>Professeur Details</h1>
      <button className="add-button">Add New Professeur</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>
              <span role="button" onClick={() => toggleMenu("Filliere")}>
                👨‍🏫 Filliere {activeMenu === "Filliere" ? "▲" : "▼"}
              </span>
              {activeMenu === "Filliere" && (
                <ul className="submenu">
                  <li role="button">Informatique</li>
                  <li role="button">Automatisme</li>
                  <li role="button">Finance</li>
                  <li role="button">Génie Civil</li>
                </ul>
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Rual Octo</td>
            <td>Informatique</td>
            <td>
              <button>👁️</button>
              <button>✏️</button>
              <button>🗑️</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Demark</td>
            <td>Finance</td>
            <td>
              <button>👁️</button>
              <button>✏️</button>
              <button>🗑️</button>
            </td>
          </tr>
          {/* Ajoutez d'autres lignes ici */}
        </tbody>
      </table>
    </div>
  );
};

export default ProfesseurCrud;
