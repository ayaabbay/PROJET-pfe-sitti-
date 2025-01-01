const mongoose = require('mongoose');
const etudiantSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateNaissance: { type: Date, required: true },
    encadrant: { type: mongoose.Schema.Types.ObjectId, ref: 'enseignant', required: true },
    rapport: { type: mongoose.Schema.Types.ObjectId, ref: 'Rapport' },
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  });
<<<<<<< HEAD
  const etudiant = mongoose.model('etudiant', etudiantSchema);
  module.exports = etudiant;  
=======
  
  const etudiant = mongoose.model('etudiant', etudiantSchema);
  module.exports = etudiant;
>>>>>>> 29b78b7412a4c1dae7214e969cdd43ac73cd9291
