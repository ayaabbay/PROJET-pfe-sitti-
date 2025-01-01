const Etudiant1 = require('../models/etudiant1Model');

// Obtenir tous les étudiants
exports.getAllEtudiants = async (req, res) => {
    try {
        const etudiants = await Etudiant1.find();
        res.status(200).json(etudiants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un nouvel étudiant
exports.createEtudiant = async (req, res) => {
    try {
        const etudiant = new Etudiant1(req.body);
        const newEtudiant = await etudiant.save();
        res.status(201).json(newEtudiant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mettre à jour un étudiant
exports.updateEtudiant = async (req, res) => {
    try {
        const etudiant = await Etudiant1.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true, runValidators: true }
        );
        if (!etudiant) {
            return res.status(404).json({ message: "Étudiant non trouvé" });
        }
        res.json(etudiant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un étudiant
exports.deleteEtudiant = async (req, res) => {
    try {
        const etudiant = await Etudiant1.findByIdAndDelete(req.params.id);
        if (!etudiant) {
            return res.status(404).json({ message: "Étudiant non trouvé" });
        }
        res.json({ message: "Étudiant supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
