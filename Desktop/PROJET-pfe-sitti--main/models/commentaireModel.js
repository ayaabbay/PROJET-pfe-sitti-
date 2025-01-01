const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
    contenu: {
        type: String,
        required: true,
        trim: true
    },
    rapport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rapport',
        required: true
    },
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    },
    etudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Etudiant',
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Commentaire', commentaireSchema);
