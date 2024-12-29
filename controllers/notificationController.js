// controllers/notificationController.js
const Notification = require('../models/notificationModel');

// Send a notification
exports.sendNotification = async (req, res) => {
    try {
        const { message, type, userType, userId } = req.body;
        
        // Validation for required fields
        if (!message || !type || !userType || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const validTypes = ['info', 'warning', 'success', 'error']; // Adjust as needed
        if (!validTypes.includes(type)) {
            return res.status(400).json({ error: 'Invalid notification type' });
        }

        // Create the notification and save it
        const notification = new Notification({ message, type, userType, userId });
        await notification.save();
        
        res.status(201).json({ message: 'Notification envoyée avec succès', notification });
    } catch (err) {
        console.error(err); // Logging for better debugging
        res.status(500).json({ error: err.message });
    }
};


// Get Notification
exports.getNotifications = async (req, res) => {
    try {
        const { userId, userType } = req.params;
        
        // Validate userId and userType
        if (!userId || !userType) {
            return res.status(400).json({ error: 'Missing userId or userType' });
        }

        // Pagination logic (optional)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;  // Default to 10 notifications per page

        const notifications = await Notification.find({ userId, userType })
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        if (!notifications.length) {
            return res.status(404).json({ message: 'No notifications found' });
        }

        res.status(200).json(notifications);
    } catch (err) {
        console.error(err); // Logging for better debugging
        res.status(500).json({ error: err.message });
    }
};


// Marquer une notification comme lue
exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        // Validate notificationId
        if (!notificationId) {
            return res.status(400).json({ error: 'Missing notificationId' });
        }

        // Find and update the notification
        const notification = await Notification.findByIdAndUpdate(
            notificationId, 
            { isRead: true }, 
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification marquée comme lue', notification });
    } catch (err) {
        console.error(err); // Logging for better debugging
        res.status(500).json({ error: err.message });
    }
};

