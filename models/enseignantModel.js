const mongoose = require('mongoose');

const enseignantSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    commentaires: [{ type: String }],
    rapports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rapport' }],
  });
  
  const enseignant = mongoose.model('enseignant', enseignantSchema);
  module.exports = enseignant;