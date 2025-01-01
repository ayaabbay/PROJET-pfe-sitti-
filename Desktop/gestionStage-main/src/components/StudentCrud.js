import React, { useState } from 'react';
import './StudentCrud.css';

function StudentCrud() {
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    nom: '',
    prenom: '',
    filiere: '',
    niveau: '',
    email: ''
  });

  const handleAddStudent = () => {
    if (newStudent.nom && newStudent.prenom && newStudent.filiere && newStudent.niveau && newStudent.email) {
      setStudents([...students, {
        id: students.length + 1,
        ...newStudent
      }]);
      setShowAddForm(false);
      setNewStudent({ nom: '', prenom: '', filiere: '', niveau: '', email: '' });
    }
  };

  return (
    <div className="student-crud">
      <h1>Gestion des Étudiants</h1>
      
      <button className="add-button" onClick={() => setShowAddForm(true)}>
        ➕ Ajouter un Étudiant
      </button>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="add-form">
            <h2>Ajouter un Étudiant</h2>
            <input
              type="text"
              placeholder="Nom"
              value={newStudent.nom}
              onChange={(e) => setNewStudent({...newStudent, nom: e.target.value})}
            />
            <input
              type="text"
              placeholder="Prénom"
              value={newStudent.prenom}
              onChange={(e) => setNewStudent({...newStudent, prenom: e.target.value})}
            />
            <select
              value={newStudent.filiere}
              onChange={(e) => setNewStudent({...newStudent, filiere: e.target.value})}
            >
              <option value="">Sélectionner une filière</option>
              <option value="Génie Informatique">Génie Informatique</option>
              <option value="Génie Civil">Génie Civil</option>
              <option value="Génie Industriel">Génie Industriel</option>
              <option value="Génie Mécanique">Génie Mécanique</option>
            </select>
            <select
              value={newStudent.niveau}
              onChange={(e) => setNewStudent({...newStudent, niveau: e.target.value})}
            >
              <option value="">Sélectionner un niveau</option>
              <option value="1ère année">1ère année</option>
              <option value="2ème année">2ème année</option>
              <option value="3ème année">3ème année</option>
              <option value="4ème année">4ème année</option>
              <option value="5ème année">5ème année</option>
            </select>
            <input
              type="email"
              placeholder="Email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
            />
            <div className="form-buttons">
              <button className="confirm-button" onClick={handleAddStudent}>Confirmer</button>
              <button className="cancel-button" onClick={() => setShowAddForm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Filière</th>
              <th>Niveau</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-message">
                  Aucun étudiant n'a été ajouté
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.nom}</td>
                  <td>{student.prenom}</td>
                  <td>{student.filiere}</td>
                  <td>{student.niveau}</td>
                  <td>{student.email}</td>
                  <td className="actions">
                    <button className="action-button view" title="Voir les détails">👁️</button>
                    <button className="action-button edit" title="Modifier">✏️</button>
                    <button className="action-button delete" title="Supprimer">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentCrud;
