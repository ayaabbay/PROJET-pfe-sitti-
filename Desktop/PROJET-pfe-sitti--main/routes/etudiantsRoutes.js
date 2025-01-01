const router = require("express").Router();
const { 
    getAllEtudiants, 
    createEtudiant, 
    updateEtudiant, 
    deleteEtudiant 
} = require("../controllers/etudiantsController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/etudiants
router.route("/")
    .get(getAllEtudiants)
    .post(verifyTokenAndAdmin, createEtudiant);

// /api/etudiants/:id
router.route("/:id")
    .put(validateObjectId, verifyTokenAndAuthorization, updateEtudiant)
    .delete(validateObjectId, verifyTokenAndAdmin, deleteEtudiant);

module.exports = router;
