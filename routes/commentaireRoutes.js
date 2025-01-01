const express = require('express');
const router = express.Router();
const { authMiddleware, isEnseignant } = require('../middlewares/authMiddleware');
const {
    ajouterCommentaire,
    getCommentairesRapport,
    modifierCommentaire,
    supprimerCommentaire
} = require('../controllers/commentaireController');

// Routes protégées par l'authentification
router.use(authMiddleware);

// Route pour ajouter un commentaire (enseignant uniquement)
router.post('/', isEnseignant, ajouterCommentaire);

// Route pour obtenir tous les commentaires d'un rapport
router.get('/rapport/:rapportId', getCommentairesRapport);

// Route pour modifier un commentaire (enseignant uniquement)
router.put('/:id', isEnseignant, modifierCommentaire);

// Route pour supprimer un commentaire (enseignant uniquement)
router.delete('/:id', isEnseignant, supprimerCommentaire);

module.exports = router;
