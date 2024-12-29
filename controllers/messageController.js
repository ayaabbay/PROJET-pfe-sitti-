// controllers/messageController.js
const Message = require('../models/messageModel');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content, conversationId } = req.body;

        if (!senderId || !receiverId || !content || !conversationId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const message = new Message({ senderId, receiverId, content, conversationId });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get messages by conversationId
exports.getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId }).sort({ date: 1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mark a message as read
exports.markAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await Message.findByIdAndUpdate(messageId, { isRead: true }, { new: true });

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Message marked as read', message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
