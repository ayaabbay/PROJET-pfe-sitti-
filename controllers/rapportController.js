const Rapport = require('../models/rapportModel');

// Soumettre un rapport (étudiant)
exports.soumettreRapport = async (req, res) => {
  try {
    const { etudiant, enseignant } = req.body;
    const newRapport = new Rapport({
      etudiant,
      enseignant,
      fichier: req.file.path, // Le chemin du fichier
    });

    await newRapport.save();
    res.status(200).json({ message: 'Rapport soumis avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les rapports soumis (enseignant)
exports.getRapports = async (req, res) => {
  try {
    const rapports = await Rapport.find().populate('etudiant enseignant');
    res.status(200).json(rapports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Télécharger un rapport
exports.telechargerRapport = async (req, res) => {
  try {
    const rapport = await Rapport.findById(req.params.id);
    if (!rapport) return res.status(404).json({ error: 'Rapport non trouvé' });

    res.download(rapport.fichier); // Télécharger le fichier
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Corriger un rapport
exports.corrigerRapport = async (req, res) => {
  try {
    const { observation } = req.body;
    const rapport = await Rapport.findById(req.params.id);

    if (!rapport) return res.status(404).json({ error: 'Rapport non trouvé' });

    rapport.observation = observation;
    rapport.corrige = true; // Marquer comme corrigé

    await rapport.save();
    res.status(200).json({ message: 'Rapport corrigé et soumis' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
