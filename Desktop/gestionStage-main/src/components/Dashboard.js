import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const stats = {
    stages: {
      total: 1000,
      enCours: 150,
      termines: 850
    },
    professeurs: {
      total: 200,
      examinateurs: 50,
      rapporteurs: 70,
      encadrants: 80
    },
    etudiants: {
      total: 1500,
      enStage: 300,
      enRecherche: 200
    }
  };

  return (
    <div className="dashboard">
      <h1>Tableau de Bord</h1>
      
      <div className="stats-grid">
        {/* Statistiques des Stages */}
        <div className="stats-card">
          <div className="stats-icon">📊</div>
          <h2>Stages</h2>
          <div className="stats-details">
            <div className="stat-item">
              <span className="stat-value">{stats.stages.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.stages.enCours}</span>
              <span className="stat-label">En cours</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.stages.termines}</span>
              <span className="stat-label">Terminés</span>
            </div>
          </div>
        </div>

        {/* Statistiques des Professeurs */}
        <div className="stats-card">
          <div className="stats-icon">👨‍🏫</div>
          <h2>Professeurs</h2>
          <div className="stats-details">
            <div className="stat-item">
              <span className="stat-value">{stats.professeurs.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.professeurs.examinateurs}</span>
              <span className="stat-label">Examinateurs</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.professeurs.encadrants}</span>
              <span className="stat-label">Encadrants</span>
            </div>
          </div>
        </div>

        {/* Statistiques des Étudiants */}
        <div className="stats-card">
          <div className="stats-icon">👨‍🎓</div>
          <h2>Étudiants</h2>
          <div className="stats-details">
            <div className="stat-item">
              <span className="stat-value">{stats.etudiants.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.etudiants.enStage}</span>
              <span className="stat-label">En stage</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.etudiants.enRecherche}</span>
              <span className="stat-label">En recherche</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Actions Rapides</h2>
        <div className="actions-grid">
          <button className="action-button">
            <span className="action-icon">➕</span>
            Ajouter un Stage
          </button>
          <button className="action-button">
            <span className="action-icon">👥</span>
            Assigner un Encadrant
          </button>
          <button className="action-button">
            <span className="action-icon">📝</span>
            Créer un Rapport
          </button>
          <button className="action-button">
            <span className="action-icon">📊</span>
            Voir les Statistiques
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
