require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../models/user');
const Enseignant = require('../models/enseignantModel');
const Etudiant = require('../models/etudiantModel');
const bcrypt = require('bcryptjs');

async function initializeData() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connecté à MongoDB');

        // Supprimer les données existantes
        await User.deleteMany({});
        await Enseignant.deleteMany({});
        await Etudiant.deleteMany({});
        console.log('Données existantes supprimées');

        // Créer un compte utilisateur pour l'enseignant
        const hashedPasswordEns = await bcrypt.hash('password123', 10);
        const userEnseignant = new User({
            username: "hajar.sitti",
            email: "sitti@example.com",
            password: hashedPasswordEns,
            role: "enseignant",
            isAccountVerified: true
        });
        await userEnseignant.save();
        console.log('Compte utilisateur enseignant créé:', userEnseignant);

        // Créer un compte utilisateur pour l'étudiant
        const hashedPasswordEtu = await bcrypt.hash('password123', 10);
        const userEtudiant = new User({
            username: "chaimaa.qchiine",
            email: "qchiine@example.com",
            password: hashedPasswordEtu,
            role: "etudiant",
            isAccountVerified: true
        });
        await userEtudiant.save();
        console.log('Compte utilisateur étudiant créé:', userEtudiant);

        // Créer un enseignant
        const enseignant = new Enseignant({
            nom: "hajar sitti",
            email: "sitti@example.com",
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
            email: "qchiine@example.com",
            dateNaissance: new Date("2000-01-01"),
            encadrant: enseignant._id
        });
        await etudiant.save();

        // Mettre à jour l'enseignant avec l'étudiant
        enseignant.etudiants.push(etudiant._id);
        await enseignant.save();

        console.log('Étudiant créé:', etudiant);
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
