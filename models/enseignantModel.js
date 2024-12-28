const mongoose = require('mongoose');

const enseignantSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    etudiants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'etudiant' }],
    commentaires: [{ type: String }],
    rapports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rapport' }],
});
  
const enseignant = mongoose.model('enseignant', enseignantSchema);
module.exports = enseignant;