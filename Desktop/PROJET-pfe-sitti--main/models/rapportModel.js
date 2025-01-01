const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
    etudiant: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    fichier: { 
        type: String, 
        required: true 
    },
    nom: { 
        type: String, 
        required: true 
    },
    observation: { 
        type: String, 
        default: "" 
    },
    dateSoumission: { 
        type: Date, 
        default: Date.now 
    },
    dateCorrection: { 
        type: Date 
    },
    corrige: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Rapport", rapportSchema);
