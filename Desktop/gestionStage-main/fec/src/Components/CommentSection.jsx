import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

function CommentSection({ report }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return; // Prevent empty comments
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', p: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Commentaires pour {report.studentName}
      </Typography>
      <List sx={{ backgroundColor: '#fff', borderRadius: 2, p: 2, maxHeight: 300, overflowY: 'auto' }}>
        {comments.map((comment, index) => (
          <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          label="Ajouter un commentaire"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Ajouter
        </Button>
      </Box>
    </Box>
  );
}

export default CommentSection;
