const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require("jsonwebtoken");

// Définir le schéma utilisateur
const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true, 
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    email: { 
        type: String,
        required: true, 
        unique: true,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 8,
        trim: true
    },
    role: { 
        type: String,
        required: true,
        enum: ['etudiant', 'enseignant', 'admin']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Générer le token JWT
userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        { 
            _id: this._id,
            username: this.username,
            email: this.email,
            role: this.role,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

// Créer le modèle
const User = mongoose.model('User', userSchema);

// Validation pour l'inscription
const validateRegisterUser = (obj) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required()
            .messages({
                'string.base': 'Le nom d\'utilisateur doit être une chaîne de caractères',
                'string.empty': 'Le nom d\'utilisateur est requis',
                'string.min': 'Le nom d\'utilisateur doit contenir au moins {#limit} caractères',
                'string.max': 'Le nom d\'utilisateur ne peut pas dépasser {#limit} caractères'
            }),
        email: Joi.string().trim().min(5).max(100).required().email()
            .messages({
                'string.email': 'L\'email n\'est pas valide',
                'string.empty': 'L\'email est requis'
            }),
        password: Joi.string().trim().min(8).required()
            .messages({
                'string.empty': 'Le mot de passe est requis',
                'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères'
            }),
        role: Joi.string().valid('etudiant', 'enseignant', 'admin').required()
            .messages({
                'any.only': 'Le rôle doit être soit "etudiant", "enseignant" ou "admin"',
                'string.empty': 'Le rôle est requis'
            })
    });
    return schema.validate(obj, { abortEarly: false });
};

// Validation pour la connexion
const validateLoginUser = (obj) => {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email()
            .messages({
                'string.email': 'L\'email n\'est pas valide',
                'string.empty': 'L\'email est requis'
            }),
        password: Joi.string().trim().min(8).required()
            .messages({
                'string.empty': 'Le mot de passe est requis',
                'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères'
            })
    });
    return schema.validate(obj, { abortEarly: false });
};

// Validation pour la mise à jour
const validateUpdateUser = (obj) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        email: Joi.string().trim().min(5).max(100).email(),
        password: Joi.string().trim().min(8),
        role: Joi.string().valid('etudiant', 'enseignant', 'admin')
    });
    return schema.validate(obj, { abortEarly: false });
};

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
};
