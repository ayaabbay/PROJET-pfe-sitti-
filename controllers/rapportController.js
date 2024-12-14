const Rapport = require('../models/rapportModel');

// Ajouter un rapport (l'étudiant envoie le rapport à un enseignant spécifique)
exports.uploadRapport = (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier téléchargé.');
  }

  const { description, etudiantId, enseignantId } = req.body;
  const fichier = req.file.path; // Chemin du fichier téléchargé

  // Créer un rapport et l'associer à l'étudiant et à l'enseignant
  const rapport = new Rapport({
    description,
    etudiant: etudiantId,   // ID de l'étudiant
    enseignant: enseignantId, // ID de l'enseignant
    fichier, // Chemin du fichier
  });

  rapport.save()
    .then(() => res.status(200).json({ message: 'Rapport envoyé à l\'enseignant avec succès!' }))
    .catch(err => res.status(500).json({ error: err.message }));
};

// Obtenir les rapports envoyés à un enseignant spécifique
exports.getRapportsParEnseignant = (req, res) => {
  const { enseignantId } = req.params;

  Rapport.find({ enseignant: enseignantId })
    .then(rapports => {
      if (rapports.length === 0) {
        return res.status(404).json({ message: 'Aucun rapport trouvé pour cet enseignant.' });
      }
      res.json(rapports);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};
