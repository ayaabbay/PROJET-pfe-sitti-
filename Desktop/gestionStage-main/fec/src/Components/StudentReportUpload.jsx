import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

function StudentReportUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Logic to handle file upload
    console.log(file);
  };

  return (
    <Box>
      <input
        accept=".pdf,.doc,.docx"
        style={{ display: 'none' }}
        id="report-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="report-upload">
        <Button variant="contained" component="span">
          Upload Report
        </Button>
      </label>
      {file && <Typography variant="body1">{file.name}</Typography>}
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}

export default StudentReportUpload;
