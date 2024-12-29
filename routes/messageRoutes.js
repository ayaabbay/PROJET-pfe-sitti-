// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Send a message
router.post('/send', messageController.sendMessage);

// Get messages in a conversation
router.get('/:conversationId', messageController.getMessages);

// Mark a message as read
router.put('/read/:messageId', messageController.markAsRead);

module.exports = router;
