const mongoose = require('mongoose');

const etudiantsSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true 
    },
    prenom: { 
        type: String, 
        required: true 
    },
    filiere: { 
        type: String, 
        required: true
    },
    niveau: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    }
}, {
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

const Etudiants = mongoose.model('Etudiants', etudiantsSchema);
module.exports = Etudiants;
