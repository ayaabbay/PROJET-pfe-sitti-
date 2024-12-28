const express = require('express');
const router = express.Router();
const rapportController = require('../controllers/rapportController');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

// Routes pour les étudiants
router.post('/soumettre', 
    auth, 
    checkRole('etudiant'),
    upload.single('rapport'), 
    rapportController.soumettreRapport
);

router.get('/mes-rapports', 
    auth, 
    checkRole('etudiant'),
    rapportController.getMesRapports
);

// Routes pour les enseignants
router.get('/liste', 
    auth, 
    checkRole('enseignant'),
    rapportController.getRapports
);

router.get('/telecharger/:id', 
    auth, 
    rapportController.telechargerRapport
);

router.post('/corriger/:id', 
    auth, 
    checkRole('enseignant'),
    rapportController.corrigerRapport
);

// Route pour obtenir les statistiques (pour l'enseignant)
router.get('/statistiques', 
    auth, 
    checkRole('enseignant'),
    rapportController.getStatistiques
);

// Route pour obtenir l'historique des rapports d'un étudiant
router.get('/historique/:etudiantId', 
    auth, 
    checkRole('enseignant'),
    rapportController.getHistoriqueEtudiant
);

module.exports = router;
