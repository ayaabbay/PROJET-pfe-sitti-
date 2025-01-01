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
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Validation pour l'inscription
const validateRegisterUser = (obj) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
        role: Joi.string().valid('etudiant', 'enseignant', 'admin').required()
    });
    return schema.validate(obj);
};

// Validation pour la connexion
const validateLoginUser = (obj) => {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required()
    });
    return schema.validate(obj);
};

// Validation pour la mise à jour
const validateUpdateUser = (obj) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        password: Joi.string().trim().min(8)
    });
    return schema.validate(obj);
};

module.exports = User;
