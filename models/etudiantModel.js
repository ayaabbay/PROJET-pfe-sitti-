const mongoose = require('mongoose');
const etudiantSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateNaissance: { type: Date, required: true },
    encadrant: { type: mongoose.Schema.Types.ObjectId, ref: 'Enseignant', required: true },
    rapports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rapport' }],
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
});
  
const Etudiant = mongoose.model('Etudiant', etudiantSchema);
module.exports = Etudiant;