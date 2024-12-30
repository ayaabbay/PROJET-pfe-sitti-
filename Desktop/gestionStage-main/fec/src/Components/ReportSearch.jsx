import React from 'react';
import { TextField, Box, Button } from '@mui/material';

function ReportSearch() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <TextField 
        label="Rechercher un rapport" 
        variant="outlined" 
        sx={{ mr: 2, width: '300px' }} 
      />
      <Button variant="contained" color="primary">
        Rechercher
      </Button>
    </Box>
  );
}

export default ReportSearch;
