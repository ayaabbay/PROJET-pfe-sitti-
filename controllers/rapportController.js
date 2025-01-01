const Rapport = require('../models/rapportModel');
const Etudiant = require('../models/etudiantModel');
const Enseignant = require('../models/enseignantModel');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// Soumettre un rapport (étudiant vers enseignant)
exports.soumettreRapport = async (req, res) => {
    try {
        // Vérifier si l'étudiant existe et a un encadrant
        const etudiant = await Etudiant.findOne({ email: req.user.email }).populate('encadrant');
        if (!etudiant) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        if (!etudiant.encadrant) {
            return res.status(400).json({ message: 'Aucun enseignant encadrant assigné' });
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

        // Mettre à jour l'enseignant avec le nouveau rapport
        const enseignant = await Enseignant.findById(etudiant.encadrant);
        enseignant.rapports.push(newRapport._id);
        await enseignant.save();

        res.status(200).json({ 
            message: 'Rapport soumis avec succès à votre encadrant',
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

// Récupérer les rapports à corriger (enseignant)
exports.getRapportsACorrection = async (req, res) => {
    try {
        // Trouver l'enseignant
        const enseignant = await Enseignant.findOne({ email: req.user.email })
            .populate({
                path: 'rapports',
                populate: {
                    path: 'etudiant',
                    select: 'nom prenom email'
                }
            });

        if (!enseignant) {
            return res.status(404).json({ message: 'Enseignant non trouvé' });
        }

        // Filtrer les rapports non corrigés
        const rapportsACorrection = enseignant.rapports.filter(rapport => !rapport.corrige);

        res.json({
            message: 'Liste des rapports à corriger',
            rapports: rapportsACorrection
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Corriger et renvoyer un rapport (enseignant)
exports.corrigerRapport = async (req, res) => {
    try {
        const rapport = await Rapport.findById(req.params.id).populate('etudiant');
        if (!rapport) {
            return res.status(404).json({ message: 'Rapport non trouvé' });
        }

        // Vérifier si l'enseignant est bien l'encadrant de l'étudiant
        const enseignant = await Enseignant.findOne({ email: req.user.email });
        if (!enseignant || !enseignant.rapports.includes(rapport._id)) {
            return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à corriger ce rapport' });
        }

        // Mettre à jour le rapport avec la correction
        rapport.observation = req.body.observation;
        rapport.corrige = true;
        rapport.dateCorrection = new Date();

        // Si un nouveau fichier corrigé est fourni
        if (req.file) {
            // Supprimer l'ancien fichier s'il existe
            if (rapport.fichierCorrige) {
                fs.unlinkSync(rapport.fichierCorrige);
            }
            rapport.fichierCorrige = req.file.path;
        }

        await rapport.save();

        res.json({ 
            message: 'Rapport corrigé avec succès', 
            rapport 
        });
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

        const filePath = req.query.type === 'corrige' ? rapport.fichierCorrige : rapport.fichier;
        if (!filePath || !fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'Fichier non trouvé' });
        }

        res.download(filePath, rapport.nom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
