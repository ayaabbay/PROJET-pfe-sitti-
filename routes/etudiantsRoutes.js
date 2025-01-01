const express = require('express');
const router = express.Router();
const etudiantsController = require('../controllers/etudiantsController');

// Routes CRUD pour les étudiants
router.post('/', etudiantsController.createEtudiants);
router.get('/', etudiantsController.getAllEtudiants);
router.get('/:id', etudiantsController.getEtudiantsById);
router.put('/:id', etudiantsController.updateEtudiants);
router.delete('/:id', etudiantsController.deleteEtudiants);

module.exports = router;
