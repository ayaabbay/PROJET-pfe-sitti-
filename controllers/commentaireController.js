const Commentaire = require('../models/commentaireModel');
const Rapport = require('../models/rapportModel');
const Enseignant = require('../models/enseignantModel');
const Etudiant = require('../models/etudiantModel');

// Ajouter un commentaire
exports.ajouterCommentaire = async (req, res) => {
    try {
        const { contenu, rapportId } = req.body;

        // Vérifier si le rapport existe
        const rapport = await Rapport.findById(rapportId);
        if (!rapport) {
            return res.status(404).json({ message: "Rapport non trouvé" });
        }

        // Vérifier si l'enseignant est bien l'encadrant de l'étudiant
        const enseignant = await Enseignant.findOne({ email: req.user.email });
        const etudiant = await Etudiant.findById(rapport.etudiant);
        
        if (!enseignant || !etudiant) {
            return res.status(404).json({ message: "Enseignant ou étudiant non trouvé" });
        }

        if (etudiant.encadrant.toString() !== enseignant._id.toString()) {
            return res.status(403).json({ message: "Vous n'êtes pas l'encadrant de cet étudiant" });
        }

        // Créer le commentaire
        const commentaire = await Commentaire.create({
            contenu,
            rapport: rapportId,
            enseignant: enseignant._id,
            etudiant: etudiant._id
        });

        // Ajouter le commentaire à la liste des commentaires de l'enseignant
        enseignant.commentaires.push(commentaire._id);
        await enseignant.save();

        res.status(201).json({
            message: "Commentaire ajouté avec succès",
            commentaire
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du commentaire", error: error.message });
    }
};

// Obtenir tous les commentaires d'un rapport
exports.getCommentairesRapport = async (req, res) => {
    try {
        const { rapportId } = req.params;

        const commentaires = await Commentaire.find({ rapport: rapportId })
            .populate('enseignant', 'nom email')
            .populate('etudiant', 'nom prenom email')
            .sort('-dateCreation');

        res.json(commentaires);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des commentaires", error: error.message });
    }
};

// Modifier un commentaire
exports.modifierCommentaire = async (req, res) => {
    try {
        const { id } = req.params;
        const { contenu } = req.body;

        const commentaire = await Commentaire.findById(id);
        if (!commentaire) {
            return res.status(404).json({ message: "Commentaire non trouvé" });
        }

        // Vérifier si l'enseignant est l'auteur du commentaire
        const enseignant = await Enseignant.findOne({ email: req.user.email });
        if (commentaire.enseignant.toString() !== enseignant._id.toString()) {
            return res.status(403).json({ message: "Vous n'êtes pas l'auteur de ce commentaire" });
        }

        commentaire.contenu = contenu;
        await commentaire.save();

        res.json({
            message: "Commentaire modifié avec succès",
            commentaire
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification du commentaire", error: error.message });
    }
};

// Supprimer un commentaire
exports.supprimerCommentaire = async (req, res) => {
    try {
        const { id } = req.params;

        const commentaire = await Commentaire.findById(id);
        if (!commentaire) {
            return res.status(404).json({ message: "Commentaire non trouvé" });
        }

        // Vérifier si l'enseignant est l'auteur du commentaire
        const enseignant = await Enseignant.findOne({ email: req.user.email });
        if (commentaire.enseignant.toString() !== enseignant._id.toString()) {
            return res.status(403).json({ message: "Vous n'êtes pas l'auteur de ce commentaire" });
        }

        // Supprimer le commentaire de la liste des commentaires de l'enseignant
        enseignant.commentaires = enseignant.commentaires.filter(
            comm => comm.toString() !== id
        );
        await enseignant.save();

        // Supprimer le commentaire
        await commentaire.remove();

        res.json({ message: "Commentaire supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du commentaire", error: error.message });
    }
};
