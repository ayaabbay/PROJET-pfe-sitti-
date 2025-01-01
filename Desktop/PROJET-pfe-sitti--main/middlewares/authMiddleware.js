const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware d'authentification
exports.authMiddleware = async (req, res, next) => {
    try {
        // 1. Récupérer le token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Pas de token d'authentification" });
        }

        // 2. Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Trouver l'utilisateur
        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: "Token invalide" });
        }

        // 4. Ajouter l'utilisateur à la requête
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Non autorisé, token invalide" });
    }
};

// Middleware pour vérifier si l'utilisateur est un enseignant
exports.isEnseignant = (req, res, next) => {
    if (req.user.role !== 'enseignant') {
        return res.status(403).json({ message: "Accès refusé. Seuls les enseignants peuvent accéder à cette ressource." });
    }
    next();
};

// Middleware pour vérifier si l'utilisateur est un étudiant
exports.isEtudiant = (req, res, next) => {
    if (req.user.role !== 'etudiant') {
        return res.status(403).json({ message: "Accès refusé. Seuls les étudiants peuvent accéder à cette ressource." });
    }
    next();
};
