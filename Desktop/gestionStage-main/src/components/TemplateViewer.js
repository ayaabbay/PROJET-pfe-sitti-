import React, { useState } from 'react';
import './TemplateViewer.css';

const TemplateViewer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = {
    examinateur: {
      title: "Template Examinateur",
      content: `
Rapport d'Évaluation - Examinateur

Informations Générales:
----------------------
Nom de l'étudiant : [NOM_ETUDIANT]
Filière : [FILIERE]
Période de stage : [DATE_DEBUT] à [DATE_FIN]
Entreprise : [NOM_ENTREPRISE]

Critères d'Évaluation:
---------------------
1. Qualité technique du travail (note /20) : ___
   Commentaires : _________________________________

2. Méthodologie et organisation (note /20) : ___
   Commentaires : _________________________________

3. Initiative et autonomie (note /20) : ___
   Commentaires : _________________________________

4. Présentation orale (note /20) : ___
   Commentaires : _________________________________

Note Finale (/20) : ___

Observations générales :
----------------------
_________________________________________________
_________________________________________________

Date : [DATE]
Signature : _____________
      `
    },
    rapporteur: {
      title: "Template Rapporteur",
      content: `
Rapport de Suivi - Rapporteur

Informations du Stage:
--------------------
Étudiant : [NOM_ETUDIANT]
Niveau d'études : [NIVEAU]
Sujet du stage : [SUJET]
Entreprise d'accueil : [ENTREPRISE]

Points de Suivi:
--------------
1. Avancement du projet
   □ Conforme au planning
   □ Léger retard
   □ Retard significatif
   
   Commentaires : _________________________________

2. Acquisition des compétences
   □ Excellente
   □ Satisfaisante
   □ À améliorer
   
   Détails : ______________________________________

3. Intégration dans l'entreprise
   □ Très bonne
   □ Bonne
   □ À améliorer
   
   Observations : _________________________________

Recommandations:
--------------
_________________________________________________
_________________________________________________

Date de la visite : [DATE]
Signature du rapporteur : ____________
      `
    }
  };

  return (
    <div className="template-viewer">
      <h1>Templates d'Évaluation</h1>
      
      <div className="template-buttons">
        <button 
          className={selectedTemplate === 'examinateur' ? 'active' : ''} 
          onClick={() => setSelectedTemplate('examinateur')}
        >
          Template Examinateur
        </button>
        <button 
          className={selectedTemplate === 'rapporteur' ? 'active' : ''} 
          onClick={() => setSelectedTemplate('rapporteur')}
        >
          Template Rapporteur
        </button>
      </div>

      {selectedTemplate && (
        <div className="template-content">
          <h2>{templates[selectedTemplate].title}</h2>
          <pre>{templates[selectedTemplate].content}</pre>
          <div className="template-actions">
            <button className="print-button" onClick={() => window.print()}>
              🖨️ Imprimer
            </button>
            <button className="download-button" onClick={() => {
              const element = document.createElement("a");
              const file = new Blob([templates[selectedTemplate].content], {type: 'text/plain'});
              element.href = URL.createObjectURL(file);
              element.download = `template_${selectedTemplate}.txt`;
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}>
              ⬇️ Télécharger
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateViewer;
