import React, { useState } from 'react';
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import CommentSection from './CommentSection';

const reports = [
  { id: 1, studentName: 'Student 1', reportName: 'report1.pdf' },
  { id: 2, studentName: 'Student 2', reportName: 'report2.docx' },
];

function TeacherReportList() {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleSelectReport = (report) => {
    setSelectedReport(report);
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        Liste des Rapports
      </Typography>
      <List sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px', p: 2 }}>
        {reports.map((report) => (
          <ListItem
            button
            onClick={() => handleSelectReport(report)}
            key={report.id}
            sx={{ mb: 1, borderRadius: '4px' }}
          >
            <ListItemText primary={report.studentName} secondary={report.reportName} />
          </ListItem>
        ))}
      </List>
      {selectedReport && (
        <Box sx={{ mt: 4 }}>
          <CommentSection report={selectedReport} />
        </Box>
      )}
    </Box>
  );
}

export default TeacherReportList;
