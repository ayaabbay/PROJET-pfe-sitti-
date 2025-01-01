import React, { useState } from 'react';
import './EncadrantCrud.css';

const EncadrantCrud = () => {
  const [encadrants, setEncadrants] = useState([
    {
      id: 1,
      nom: "Dr. Hassan",
      prenom: "Karim",
      specialite: "Développement Web",
      departement: "Génie Informatique",
      email: "k.hassan@emsi.ma",
      etudiantsEncadres: 4
    },
    {
      id: 2,
      nom: "Dr. Alami",
      prenom: "Fatima",
      specialite: "Intelligence Artificielle",
      departement: "Génie Informatique",
      email: "f.alami@emsi.ma",
      etudiantsEncadres: 3
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newEncadrant, setNewEncadrant] = useState({
    nom: '',
    prenom: '',
    specialite: '',
    departement: '',
    email: '',
    etudiantsEncadres: 0
  });

  const handleAddEncadrant = () => {
    setEncadrants([...encadrants, {
      id: encadrants.length + 1,
      ...newEncadrant
    }]);
    setShowAddForm(false);
    setNewEncadrant({
      nom: '',
      prenom: '',
      specialite: '',
      departement: '',
      email: '',
      etudiantsEncadres: 0
    });
  };

  const specialites = [
    "Développement Web",
    "Intelligence Artificielle",
    "Réseaux",
    "Sécurité",
    "Base de données",
    "Cloud Computing"
  ];

  return (
    <div className="encadrant-crud">
      <h1>Gestion des Encadrants</h1>
      
      <button className="add-button" onClick={() => setShowAddForm(true)}>
        Ajouter un Encadrant
      </button>

      {showAddForm && (
        <div className="add-form">
          <h2>Ajouter un Encadrant</h2>
          <input
            type="text"
            placeholder="Nom"
            value={newEncadrant.nom}
            onChange={(e) => setNewEncadrant({...newEncadrant, nom: e.target.value})}
          />
          <input
            type="text"
            placeholder="Prénom"
            value={newEncadrant.prenom}
            onChange={(e) => setNewEncadrant({...newEncadrant, prenom: e.target.value})}
          />
          <select
            value={newEncadrant.specialite}
            onChange={(e) => setNewEncadrant({...newEncadrant, specialite: e.target.value})}
          >
            <option value="">Sélectionner une spécialité</option>
            {specialites.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
          <select
            value={newEncadrant.departement}
            onChange={(e) => setNewEncadrant({...newEncadrant, departement: e.target.value})}
          >
            <option value="">Sélectionner un département</option>
            <option value="Génie Informatique">Génie Informatique</option>
            <option value="Télécommunications">Télécommunications</option>
            <option value="Génie Civil">Génie Civil</option>
            <option value="Finance">Finance</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            value={newEncadrant.email}
            onChange={(e) => setNewEncadrant({...newEncadrant, email: e.target.value})}
          />
          <div className="form-buttons">
            <button onClick={handleAddEncadrant}>Confirmer</button>
            <button onClick={() => setShowAddForm(false)}>Annuler</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Spécialité</th>
            <th>Département</th>
            <th>Email</th>
            <th>Étudiants Encadrés</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {encadrants.map((encadrant) => (
            <tr key={encadrant.id}>
              <td>{encadrant.id}</td>
              <td>{encadrant.nom}</td>
              <td>{encadrant.prenom}</td>
              <td>{encadrant.specialite}</td>
              <td>{encadrant.departement}</td>
              <td>{encadrant.email}</td>
              <td>{encadrant.etudiantsEncadres}</td>
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

export default EncadrantCrud;
