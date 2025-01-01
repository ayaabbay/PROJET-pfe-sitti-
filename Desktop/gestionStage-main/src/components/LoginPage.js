import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/course.png'; // Importation de l'image
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      navigate('/dashboard');
    } else {
      setError('Veuillez remplir tous les champs');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src={studentImage} alt="Students" />
        </div>
        <div className="login-form">
          <h1>Bienvenue à EMSI PFE ET PFA</h1>
          <p className="login-description">
            Cette plateforme est conçue pour la gestion des stages, PFE et PFA de l'EMSI. 
            Simplifiez la gestion académique, organisez les classes, et ajoutez des étudiants et des encadrants.
          </p>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="Entrez votre nom d'utilisateur"
                required
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button type="submit" className="login-button">
              CONNEXION
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;