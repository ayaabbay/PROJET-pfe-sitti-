const Etudiants = require('../models/etudiantsModel');

// Créer un nouvel étudiant
exports.createEtudiants = async (req, res) => {
    try {
        const etudiant = new Etudiants(req.body);
        await etudiant.save();
        res.status(201).json(etudiant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir tous les étudiants
exports.getAllEtudiants = async (req, res) => {
    try {
        const etudiants = await Etudiants.find();
        res.json(etudiants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir un étudiant par ID
exports.getEtudiantsById = async (req, res) => {
    try {
        const etudiant = await Etudiants.findById(req.params.id);
        if (!etudiant) {
            return res.status(404).json({ message: "Étudiant non trouvé" });
        }
        res.json(etudiant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un étudiant
exports.updateEtudiants = async (req, res) => {
    try {
        const etudiant = await Etudiants.findByIdAndUpdate(
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
exports.deleteEtudiants = async (req, res) => {
    try {
        const etudiant = await Etudiants.findByIdAndDelete(req.params.id);
        if (!etudiant) {
            return res.status(404).json({ message: "Étudiant non trouvé" });
        }
        res.json({ message: "Étudiant supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
