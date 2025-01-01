import React from "react";
import { Button, Card, CardContent, Grid, Typography, IconButton, Box } from "@mui/material";
import { Download as DownloadIcon, CheckCircle as CheckCircleIcon, Warning as WarningIcon } from "@mui/icons-material";
import { rapports } from '../Data/data'; // Importez les données ici

const RapportItem = ({ rapport }) => {
  return (
    <Card sx={{ margin: 2, padding: 1, backgroundColor: rapport.state === "En attente" ? "#ffeb3b" : "#e8f5e9" }}>
      <CardContent>
        <Typography variant="h6">Nom du Rapport: {rapport.nom}</Typography>
        <Typography variant="body1"><strong>Nom de l'étudiant:</strong> {rapport.etudiant}</Typography>
        <Typography variant="body1"><strong>Date de Soumission:</strong> {rapport.dateSoumission}</Typography>
        <Typography variant="body2" paragraph><strong>Description:</strong> {rapport.description}</Typography>
        <Typography variant="body2"><strong>État:</strong> {rapport.state}</Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
          {rapport.state === "En attente" ? (
            <WarningIcon color="warning" />
          ) : (
            <CheckCircleIcon color="success" />
          )}

          <div>
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

const RapportList = () => {
  return (
    <Box sx={{ padding: 11 }}>
      <Typography variant="h4" gutterBottom>Rapports soumis par les étudiants</Typography>
      <Grid container spacing={1}>
        {rapports.map((rapport, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <RapportItem rapport={rapport} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RapportList;
