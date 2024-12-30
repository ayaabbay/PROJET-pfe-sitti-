import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/course.png'; 
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content-section">
        <div className="image-section">
          <img src={studentImage} alt="Students" />
        </div>
        <div className="text-section">
          <h1>Bienvenue à EMSI PFE ET PFA</h1>
          <p>
            Cette plateforme est conçue pour la gestion des stages, PFE et PFA de l'EMSI. 
            Simplifiez la gestion académique, organisez les classes, et ajoutez des étudiants et des encadrants.
          </p>
          <button 
            className="connexion-button"
            onClick={() => navigate('/login')}
          >
            CONNEXION
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
