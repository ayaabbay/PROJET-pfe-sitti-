const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  soumettreRapport,
  getRapports,
  telechargerRapport,
  corrigerRapport,
} = require('../controllers/rapportController');

const router = express.Router();

// Configuration de Multer pour le téléchargement des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
router.post('/soumettre', upload.single('fichier'), soumettreRapport); // Soumettre un rapport
router.get('/', getRapports); // Récupérer les rapports
router.get('/telecharger/:id', telechargerRapport); // Télécharger un rapport
router.post('/:id/corriger', corrigerRapport); // Corriger un rapport

module.exports = router;
