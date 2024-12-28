require('dotenv').config();
const Enseignant = require('../models/enseignantModel');
const Etudiant = require('../models/etudiantModel');
const connectToDb = require('./connectToDb');

const enseignants = [
    {
        nom: "Dr. Ahmed Ben Ali",
        email: "ahmed.benali@universite.com",
    },
    {
        nom: "Dr. Sarah Mansouri",
        email: "sarah.mansouri@universite.com",
    },
    {
        nom: "Dr. Mohamed Trabelsi",
        email: "mohamed.trabelsi@universite.com",
    }
];

const etudiants = [
    {
        nom: "Amira",
        prenom: "Bouazizi",
        email: "amira.bouazizi@etudiant.com",
        dateNaissance: new Date('1999-05-15'),
    },
    {
        nom: "Yassine",
        prenom: "Khouja",
        email: "yassine.khouja@etudiant.com",
        dateNaissance: new Date('2000-03-22'),
    },
    {
        nom: "Rania",
        prenom: "Mejri",
        email: "rania.mejri@etudiant.com",
        dateNaissance: new Date('1998-11-30'),
    }
];

async function seedData() {
    try {
        // Connexion à la base de données
        await connectToDb();

        // Suppression des données existantes
        await Enseignant.deleteMany({});
        await Etudiant.deleteMany({});

        // Création des enseignants
        const createdEnseignants = await Enseignant.create(enseignants);

        // Attribution aléatoire des encadrants aux étudiants
        const etudiantsWithEncadrants = etudiants.map(etudiant => {
            const randomEncadrant = createdEnseignants[Math.floor(Math.random() * createdEnseignants.length)];
            return {
                ...etudiant,
                encadrant: randomEncadrant._id
            };
        });

        // Création des étudiants
        const createdEtudiants = await Etudiant.create(etudiantsWithEncadrants);

        // Mise à jour des enseignants avec leurs étudiants
        for (const etudiant of createdEtudiants) {
            await Enseignant.findByIdAndUpdate(
                etudiant.encadrant,
                { $push: { etudiants: etudiant._id } }
            );
        }

        console.log('Données de test créées avec succès !');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de la création des données de test:', error);
        process.exit(1);
    }
}

seedData();
