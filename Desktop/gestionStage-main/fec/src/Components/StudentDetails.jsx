// StudentDetails.js
import React, { useState } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';

const StudentDetails = ({ student, onSubmit }) => {
  const [report, setReport] = useState(null);
  const [comment, setComment] = useState('');

  const handleFileChange = (event) => {
    setReport(event.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('report', report);
    formData.append('comment', comment);
    formData.append('studentId', student.id);

    onSubmit(formData);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <h2>Détails de l'étudiant : {student.name}</h2>
      <Box>
        <TextField
          label="Commentaire"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box sx={{ mt: 2 }}>
          <input type="file" onChange={handleFileChange} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Envoyer le rapport corrigé
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default StudentDetails;
