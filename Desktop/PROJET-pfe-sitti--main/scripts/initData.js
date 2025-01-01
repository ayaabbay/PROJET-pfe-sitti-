const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Etudiant = require('../models/etudiantsModel');
const Enseignant = require('../models/enseignantModel');
require('dotenv').config();

async function initializeData() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connecté à MongoDB');

        // Supprimer les données existantes
        await Promise.all([
            User.deleteMany({}),
            Etudiant.deleteMany({}),
            Enseignant.deleteMany({})
        ]);
        console.log('Données existantes supprimées');

        // Créer un compte utilisateur pour l'enseignant
        const userEnseignant = new User({
            username: "hajar.sitti",
            email: "sitti@enseignant.com",
            password: await bcrypt.hash("password123", 10),
            role: "enseignant",
            isAdmin: false
        });
        await userEnseignant.save();
        console.log('Compte utilisateur enseignant créé:', userEnseignant);

        // Créer un compte utilisateur pour l'étudiant
        const userEtudiant = new User({
            username: "chaimaa.qchiine",
            email: "qchiine@etudiant.com",
            password: await bcrypt.hash("password123", 10),
            role: "etudiant",
            isAdmin: false
        });
        await userEtudiant.save();
        console.log('Compte utilisateur étudiant créé:', userEtudiant);

        // Créer un enseignant
        const enseignant = new Enseignant({
            nom: "hajar sitti",
            email: "sitti@enseignant.com",
            etudiants: [],
            commentaires: [],
            rapports: []
        });
        await enseignant.save();
        console.log('Enseignant créé:', enseignant);

        // Créer un étudiant
        const etudiant = new Etudiant({
            nom: "qchiine",
            prenom: "chaimaa",
            email: "qchiine@etudiant.com",
            dateNaissance: new Date("2000-01-01"),
            encadrant: enseignant._id
        });
        await etudiant.save();
        console.log('Étudiant créé:', etudiant);

        // Mettre à jour l'enseignant avec l'étudiant
        enseignant.etudiants.push(etudiant._id);
        await enseignant.save();

        console.log('Données initialisées avec succès !');

        // Générer et afficher les tokens
        const tokenEtudiant = userEtudiant.generateAuthToken();
        const tokenEnseignant = userEnseignant.generateAuthToken();

        console.log('\nTokens d\'authentification :');
        console.log('Token Étudiant (Chaimaa Qchiine):', tokenEtudiant);
        console.log('Token Enseignant (Hajar Sitti):', tokenEnseignant);

        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des données:', error);
        process.exit(1);
    }
}

initializeData();
