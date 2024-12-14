const mongoose = require('mongoose');

const rapportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  statut: { type: String, enum: ['Soumis', 'Validé', 'Refusé'], default: 'Soumis' },
  dateSoumission: { type: Date, default: Date.now },
  commentaire: [{ type: String }],
  etudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant', required: true },
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'Enseignant', required: true },
  fichier: { type: String, required: true }, // Chemin du fichier téléchargé
});

const Rapport = mongoose.model('Rapport', rapportSchema);
module.exports = Rapport;
