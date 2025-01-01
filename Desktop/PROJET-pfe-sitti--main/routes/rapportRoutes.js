const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authMiddleware, isEnseignant } = require('../middlewares/authMiddleware');
const rapportController = require('../controllers/rapportController');

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/rapports')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /pdf|doc|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Seuls les fichiers PDF et Word sont autorisés!'));
    }
});

// Routes pour les rapports
router.post('/soumettre', authMiddleware, upload.single('rapport'), rapportController.soumettreRapport);
router.get('/a-corriger', authMiddleware, isEnseignant, rapportController.getRapportsACorrection);
router.post('/corriger/:id', authMiddleware, isEnseignant, upload.single('rapportCorrige'), rapportController.corrigerRapport);
router.get('/telecharger/:id', authMiddleware, rapportController.telechargerRapport);

module.exports = router;
