import React, { useState } from 'react';
import './StageCrud.css';

function StageCrud() {
  const [stages, setStages] = useState([
    {
      id: 1,
      titre: "Développement d'une Application Mobile E-learning",
      entreprise: "TechMobile",
      type: "PFE",
      technologies: ["React Native", "Node.js", "MongoDB"],
      duree: "6 mois",
      statut: "Disponible",
      description: "Conception et développement d'une application mobile pour l'apprentissage en ligne",
      encadrant: "Dr. Hassan",
      etudiant: null
    },
    {
      id: 2,
      titre: "Intelligence Artificielle pour la Détection de Fraudes",
      entreprise: "SecureAI",
      type: "PFA",
      technologies: ["Python", "TensorFlow", "SQL"],
      duree: "4 mois",
      statut: "Attribué",
      description: "Développement d'un système de détection de fraudes basé sur l'IA",
      encadrant: "Dr. Alami",
      etudiant: "Mohammed Alaoui"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStage, setNewStage] = useState({
    titre: '',
    entreprise: '',
    type: 'PFE',
    technologies: [],
    duree: '',
    statut: 'Disponible',
    description: '',
    encadrant: '',
    etudiant: null
  });

  const handleAddStage = () => {
    if (newStage.titre && newStage.entreprise && newStage.description) {
      setStages([...stages, {
        id: stages.length + 1,
        ...newStage,
        technologies: newStage.technologies.split(',').map(tech => tech.trim())
      }]);
      setShowAddForm(false);
      setNewStage({
        titre: '',
        entreprise: '',
        type: 'PFE',
        technologies: [],
        duree: '',
        statut: 'Disponible',
        description: '',
        encadrant: '',
        etudiant: null
      });
    }
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Disponible':
        return '#4CAF50';
      case 'Attribué':
        return '#2196F3';
      case 'Terminé':
        return '#9E9E9E';
      default:
        return '#757575';
    }
  };

  return (
    <div className="stage-crud">
      <div className="header">
        <h1>Gestion des Stages</h1>
        <button className="add-button" onClick={() => setShowAddForm(true)}>
          Ajouter un Stage
        </button>
      </div>

      {showAddForm && (
        <div className="add-form">
          <h2>Ajouter un Nouveau Stage</h2>
          <input
            type="text"
            placeholder="Titre du stage"
            value={newStage.titre}
            onChange={(e) => setNewStage({...newStage, titre: e.target.value})}
          />
          <input
            type="text"
            placeholder="Entreprise"
            value={newStage.entreprise}
            onChange={(e) => setNewStage({...newStage, entreprise: e.target.value})}
          />
          <select
            value={newStage.type}
            onChange={(e) => setNewStage({...newStage, type: e.target.value})}
          >
            <option value="PFE">PFE</option>
            <option value="PFA">PFA</option>
          </select>
          <input
            type="text"
            placeholder="Technologies requises (séparées par des virgules)"
            value={newStage.technologies}
            onChange={(e) => setNewStage({...newStage, technologies: e.target.value})}
          />
          <input
            type="text"
            placeholder="Durée"
            value={newStage.duree}
            onChange={(e) => setNewStage({...newStage, duree: e.target.value})}
          />
          <textarea
            placeholder="Description du stage"
            value={newStage.description}
            onChange={(e) => setNewStage({...newStage, description: e.target.value})}
          />
          <input
            type="text"
            placeholder="Encadrant"
            value={newStage.encadrant}
            onChange={(e) => setNewStage({...newStage, encadrant: e.target.value})}
          />
          <div className="form-buttons">
            <button onClick={handleAddStage}>Confirmer</button>
            <button onClick={() => setShowAddForm(false)}>Annuler</button>
          </div>
        </div>
      )}

      <div className="stages-grid">
        {stages.map((stage) => (
          <div key={stage.id} className="stage-card">
            <div className="stage-header">
              <h3>{stage.titre}</h3>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(stage.statut) }}
              >
                {stage.statut}
              </span>
            </div>
            <div className="stage-content">
              <p><strong>Entreprise:</strong> {stage.entreprise}</p>
              <p><strong>Type:</strong> {stage.type}</p>
              <p><strong>Technologies:</strong></p>
              <div className="technologies">
                {stage.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>
              <p><strong>Durée:</strong> {stage.duree}</p>
              <p><strong>Description:</strong> {stage.description}</p>
              <p><strong>Encadrant:</strong> {stage.encadrant}</p>
              {stage.etudiant && (
                <p><strong>Étudiant assigné:</strong> {stage.etudiant}</p>
              )}
            </div>
            <div className="stage-actions">
              <button title="Voir les détails">👁️</button>
              <button title="Modifier">✏️</button>
              <button title="Supprimer">🗑️</button>
              {stage.statut === 'Disponible' && (
                <button title="Assigner un étudiant">👤</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StageCrud;
