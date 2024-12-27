const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
  etudiant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fichier: { type: String, required: true }, // chemin vers le fichier
  observation: { type: String, default: "" }, // observations après correction
  dateSoumission: { type: Date, default: Date.now },
  corrige: { type: Boolean, default: false },
});

module.exports = mongoose.model("Rapport", rapportSchema);
