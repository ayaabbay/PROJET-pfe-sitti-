const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuration de Multer pour stocker les fichiers dans le dossier "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination du dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Donne un nom unique au fichier
  }
});

const upload = multer({ storage });

// Importer le contrôleur des rapports
const rapportController = require('../controllers/rapportController');

// Route pour uploader un rapport (l'étudiant envoie un rapport à un enseignant)
router.post('/upload', upload.single('fichier'), rapportController.uploadRapport);

// Route pour obtenir tous les rapports d'un enseignant spécifique
router.get('/:enseignantId', rapportController.getRapportsParEnseignant);

module.exports = router;
