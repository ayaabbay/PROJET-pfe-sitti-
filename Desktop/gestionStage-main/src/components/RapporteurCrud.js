import React, { useState } from 'react';
import './RapporteurCrud.css';

const RapporteurCrud = () => {
  const [rapporteurs, setRapporteurs] = useState([
    {
      id: 1,
      nom: "Dr. Mohamed",
      prenom: "Ahmed",
      specialite: "Informatique",
      departement: "Génie Informatique",
      email: "mohamed.ahmed@emsi.ma",
      stagesAssignes: 2
    },
    {
      id: 2,
      nom: "Dr. Benani",
      prenom: "Samira",
      specialite: "Réseaux",
      departement: "Télécommunications",
      email: "s.benani@emsi.ma",
      stagesAssignes: 3
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRapporteur, setNewRapporteur] = useState({
    nom: '',
    prenom: '',
    specialite: '',
    departement: '',
    email: '',
    stagesAssignes: 0
  });

  const handleAddRapporteur = () => {
    setRapporteurs([...rapporteurs, {
      id: rapporteurs.length + 1,
      ...newRapporteur
    }]);
    setShowAddForm(false);
    setNewRapporteur({
      nom: '',
      prenom: '',
      specialite: '',
      departement: '',
      email: '',
      stagesAssignes: 0
    });
  };

  return (
    <div className="rapporteur-crud">
      <h1>Gestion des Rapporteurs</h1>
      
      <button className="add-button" onClick={() => setShowAddForm(true)}>
        Ajouter un Rapporteur
      </button>

      {showAddForm && (
        <div className="add-form">
          <h2>Ajouter un Rapporteur</h2>
          <input
            type="text"
            placeholder="Nom"
            value={newRapporteur.nom}
            onChange={(e) => setNewRapporteur({...newRapporteur, nom: e.target.value})}
          />
          <input
            type="text"
            placeholder="Prénom"
            value={newRapporteur.prenom}
            onChange={(e) => setNewRapporteur({...newRapporteur, prenom: e.target.value})}
          />
          <input
            type="text"
            placeholder="Spécialité"
            value={newRapporteur.specialite}
            onChange={(e) => setNewRapporteur({...newRapporteur, specialite: e.target.value})}
          />
          <select
            value={newRapporteur.departement}
            onChange={(e) => setNewRapporteur({...newRapporteur, departement: e.target.value})}
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
            value={newRapporteur.email}
            onChange={(e) => setNewRapporteur({...newRapporteur, email: e.target.value})}
          />
          <div className="form-buttons">
            <button onClick={handleAddRapporteur}>Confirmer</button>
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
            <th>Stages Assignés</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rapporteurs.map((rapporteur) => (
            <tr key={rapporteur.id}>
              <td>{rapporteur.id}</td>
              <td>{rapporteur.nom}</td>
              <td>{rapporteur.prenom}</td>
              <td>{rapporteur.specialite}</td>
              <td>{rapporteur.departement}</td>
              <td>{rapporteur.email}</td>
              <td>{rapporteur.stagesAssignes}</td>
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

export default RapporteurCrud;
