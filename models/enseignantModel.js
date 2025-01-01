const mongoose = require('mongoose');

const enseignantSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    etudiants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }],
    commentaires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commentaire' }],
    rapports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rapport' }],
});
  
const Enseignant = mongoose.model('Enseignant', enseignantSchema);
module.exports = Enseignant;