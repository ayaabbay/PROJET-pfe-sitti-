const { User } = require('../models/User');
const Rapport = require('../models/rapportModel');
const fs = require('fs');
const path = require('path');

// Soumettre un rapport (étudiant)
exports.soumettreRapport = async (req, res) => {
    try {
        // Vérifier si l'étudiant existe
        const etudiant = await User.findById(req.user._id);
        if (!etudiant) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier n\'a été uploadé' });
        }

        // Créer le rapport
        const newRapport = new Rapport({
            etudiant: etudiant._id,
            fichier: req.file.path,
            dateSoumission: new Date(),
            nom: req.file.originalname
        });

        await newRapport.save();

        res.status(200).json({ 
            message: 'Rapport soumis avec succès',
            rapport: newRapport
        });

    } catch (error) {
        console.error('Erreur lors de la soumission du rapport:', error);
        res.status(500).json({ 
            message: 'Erreur lors de la soumission du rapport',
            error: error.message 
        });
    }
};

// Récupérer les rapports soumis (enseignant)
exports.getRapports = async (req, res) => {
    try {
        const rapports = await Rapport.find().populate('etudiant', 'username email');
        res.json(rapports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Télécharger un rapport
exports.telechargerRapport = async (req, res) => {
    try {
        const rapport = await Rapport.findById(req.params.id);
        if (!rapport) {
            return res.status(404).json({ message: 'Rapport non trouvé' });
        }

        const filePath = rapport.fichier;
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'Fichier non trouvé' });
        }

        res.download(filePath, rapport.nom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Corriger un rapport
exports.corrigerRapport = async (req, res) => {
    try {
        const rapport = await Rapport.findById(req.params.id);
        if (!rapport) {
            return res.status(404).json({ message: 'Rapport non trouvé' });
        }

        rapport.observation = req.body.observation;
        rapport.corrige = req.body.corrige;
        rapport.dateCorrection = new Date();

        await rapport.save();

        res.json({ message: 'Rapport corrigé avec succès', rapport });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir mes rapports (pour l'étudiant)
exports.getMesRapports = async (req, res) => {
    try {
        const rapports = await Rapport.find({ etudiant: req.user._id });
        res.json(rapports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir les statistiques (pour l'enseignant)
exports.getStatistiques = async (req, res) => {
    try {
        const stats = await Rapport.aggregate([
            {
                $group: {
                    _id: null,
                    totalRapports: { $sum: 1 },
                    rapportsCorriges: {
                        $sum: { $cond: [{ $eq: ['$corrige', true] }, 1, 0] }
                    },
                    rapportsEnAttente: {
                        $sum: { $cond: [{ $eq: ['$corrige', false] }, 1, 0] }
                    }
                }
            }
        ]);

        res.json({
            totalRapports: stats[0]?.totalRapports || 0,
            rapportsCorriges: stats[0]?.rapportsCorriges || 0,
            rapportsEnAttente: stats[0]?.rapportsEnAttente || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir l'historique des rapports d'un étudiant
exports.getHistoriqueEtudiant = async (req, res) => {
    try {
        const rapports = await Rapport.find({ etudiant: req.params.etudiantId })
            .sort({ dateSoumission: -1 })
            .populate('etudiant', 'username email');
            
        res.json(rapports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
