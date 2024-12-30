import React from 'react';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box sx={{ p: 4, pt: 10, textAlign: 'center' }}> {/* Ajout d'un padding-top pour compenser la hauteur de la navbar */}
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenue à la Gestion des Rapports
      </Typography>
      <Typography variant="body1">
        Cette application permet aux étudiants de télécharger leurs rapports et aux enseignants de les gérer.
      </Typography>
    </Box>
  );
}

export default Home;
