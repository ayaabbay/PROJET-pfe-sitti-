// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Endpoint pour envoyer une notification
router.post('/send', notificationController.sendNotification);

// Endpoint pour récupérer les notifications par utilisateur et type (étudiant ou enseignant)
router.get('/:userId/:userType', notificationController.getNotifications);

// Endpoint pour marquer une notification comme lue
router.put('/read/:notificationId', notificationController.markAsRead);

module.exports = router;
