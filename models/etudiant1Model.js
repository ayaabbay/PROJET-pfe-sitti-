const mongoose = require('mongoose');

const etudiant1Schema = new mongoose.Schema({
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
        required: true,
        enum: ['Génie Informatique', 'Génie Civil', 'Génie Industriel', 'Génie Mécanique']
    },
    niveau: { 
        type: String, 
        required: true,
        enum: ['1ère année', '2ème année', '3ème année', '4ème année', '5ème année']
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez entrer un email valide']
    }
}, {
    timestamps: true
});

const Etudiant1 = mongoose.model('Etudiant1', etudiant1Schema);
module.exports = Etudiant1;
