import React, { useState, useEffect } from 'react';
import { Container, Box, Paper } from '@mui/material';
import StudentsList from '../Components/StudentsList'; // Import du composant de la liste des étudiants
import StudentDetails from '../Components/StudentDetails'; // Import du composant des détails de l'étudiant

const UploadReport = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Exemple de récupération des étudiants depuis une API ou de données simulées
    const fetchStudents = async () => {
      const response = await fetch('/api/students');  // L'API réelle à mettre ici
      const data = await response.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleSubmitReport = (formData) => {
    // Envoi des données au backend
    fetch('/api/upload-report', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        alert('Rapport corrigé envoyé avec succès!');
        setSelectedStudent(null);  // Optionnellement reset l'étudiant sélectionné
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi du rapport:', error);
      });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '64px' }}>
      {/* Padding au top pour éviter que le contenu soit caché sous la navbar */}
      <Container sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
          {/* Liste des étudiants à gauche */}
          <Box flex={1} minWidth="250px">
            <Paper sx={{ padding: 2 }}>
              <StudentsList students={students} onSelectStudent={handleSelectStudent} />
            </Paper>
          </Box>

          {/* Détails de l'étudiant sélectionné à droite */}
          {selectedStudent && (
            <Box flex={2} minWidth="350px">
              <Paper sx={{ padding: 2 }}>
                <StudentDetails student={selectedStudent} onSubmit={handleSubmitReport} />
              </Paper>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default UploadReport;
