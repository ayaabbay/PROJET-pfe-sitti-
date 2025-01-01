require('dotenv').config();
const Enseignant = require('../models/enseignantModel');
const Etudiant = require('../models/etudiantsModel');
const connectToDb = require('./connectToDb');

async function checkData() {
    try {
        await connectToDb();
        
        console.log('\n=== Enseignants ===');
        const enseignants = await Enseignant.find({});
        console.log(JSON.stringify(enseignants, null, 2));
        
        console.log('\n=== Étudiants ===');
        const etudiants = await Etudiant.find({});
        console.log(JSON.stringify(etudiants, null, 2));
        
        process.exit(0);
    } catch (error) {
        console.error('Erreur:', error);
        process.exit(1);
    }
}

checkData();
