require('dotenv').config();
const Enseignant = require('../models/enseignantModel');
const Etudiant = require('../models/etudiantsModel');
const connectToDb = require('./connectToDb');

async function addStudent() {
    try {
        await connectToDb();

        // Trouver Dr. Sarah Mansouri
        const sarah = await Enseignant.findOne({ email: "sarah.mansouri@universite.com" });
        if (!sarah) {
            console.log("Dr. Sarah Mansouri non trouvée");
            process.exit(1);
        }

        // Créer un nouvel étudiant
        const nouvelEtudiant = new Etudiant({
            nom: "Karim",
            prenom: "Ben Salah",
            email: "karim.bensalah@etudiant.com",
            dateNaissance: new Date('2000-07-15'),
            encadrant: sarah._id
        });

        // Sauvegarder l'étudiant
        const etudiantSauvegarde = await nouvelEtudiant.save();

        // Mettre à jour la liste des étudiants de Dr. Sarah
        await Enseignant.findByIdAndUpdate(
            sarah._id,
            { $push: { etudiants: etudiantSauvegarde._id } }
        );

        console.log('Nouvel étudiant ajouté avec succès !');
        console.log('Étudiant:', etudiantSauvegarde);

        // Vérifier la mise à jour
        const sarahMiseAJour = await Enseignant.findById(sarah._id).populate('etudiants');
        console.log('\nDr. Sarah Mansouri encadre maintenant :', 
            sarahMiseAJour.etudiants.map(e => `${e.prenom} ${e.nom}`));

        process.exit(0);
    } catch (error) {
        console.error('Erreur:', error);
        process.exit(1);
    }
}

addStudent();
