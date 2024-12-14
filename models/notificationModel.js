const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    expediteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    contenu: { type: String, required: true },
    dateEnvoi: { type: Date, default: Date.now },
  });
  
  const Notification = mongoose.model('Notification', notificationSchema);
  module.exports = Notification;