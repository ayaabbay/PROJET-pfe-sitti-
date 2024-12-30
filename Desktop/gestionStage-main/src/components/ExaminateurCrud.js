import React, { useState } from 'react';
import './ExaminateurCrud.css';

const ExaminateurCrud = () => {
  const [examinateurs, setExaminateurs] = useState([
    {
      id: 1,
      nom: "Dr. Ahmed",
      specialite: "Informatique",
      disponibilite: "Disponible",
      nombreSoutenances: 3
    },
    {
      id: 2,
      nom: "Dr. Sarah",
      specialite: "Réseaux",
      disponibilite: "Occupé",
      nombreSoutenances: 5
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newExaminateur, setNewExaminateur] = useState({
    nom: '',
    specialite: '',
    disponibilite: 'Disponible'
  });

  const handleAddExaminateur = () => {
    setExaminateurs([...examinateurs, {
      id: examinateurs.length + 1,
      ...newExaminateur,
      nombreSoutenances: 0
    }]);
    setShowAddForm(false);
    setNewExaminateur({ nom: '', specialite: '', disponibilite: 'Disponible' });
  };

  return (
    <div className="examinateur-crud">
      <h1>Gestion des Examinateurs</h1>
      
      <button className="add-button" onClick={() => setShowAddForm(true)}>
        ➕ Ajouter un Examinateur
      </button>

      {showAddForm && (
        <div className="add-form">
          <h2>Ajouter un Examinateur</h2>
          <input
            type="text"
            placeholder="Nom"
            value={newExaminateur.nom}
            onChange={(e) => setNewExaminateur({...newExaminateur, nom: e.target.value})}
          />
          <input
            type="text"
            placeholder="Spécialité"
            value={newExaminateur.specialite}
            onChange={(e) => setNewExaminateur({...newExaminateur, specialite: e.target.value})}
          />
          <select
            value={newExaminateur.disponibilite}
            onChange={(e) => setNewExaminateur({...newExaminateur, disponibilite: e.target.value})}
          >
            <option value="Disponible">Disponible</option>
            <option value="Occupé">Occupé</option>
          </select>
          <div className="form-buttons">
            <button onClick={handleAddExaminateur}>Confirmer</button>
            <button onClick={() => setShowAddForm(false)}>Annuler</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Disponibilité</th>
            <th>Soutenances</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {examinateurs.map((examinateur) => (
            <tr key={examinateur.id}>
              <td>{examinateur.id}</td>
              <td>{examinateur.nom}</td>
              <td>{examinateur.specialite}</td>
              <td>
                <span className={`status ${examinateur.disponibilite.toLowerCase()}`}>
                  {examinateur.disponibilite}
                </span>
              </td>
              <td>{examinateur.nombreSoutenances}</td>
              <td className="actions">
                <button title="Voir les détails">👁️</button>
                <button title="Modifier">✏️</button>
                <button title="Supprimer">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExaminateurCrud;
