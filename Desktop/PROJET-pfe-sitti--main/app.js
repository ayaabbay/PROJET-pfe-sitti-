const express = require('express');
const connectToDb = require("./config/connectToDb");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require("dotenv").config();
const cors = require('cors');

// Connection à la base de données
connectToDb();

// Vérifier si le dossier "uploads" existe, sinon le créer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Initialisation de l'application
const app = express();

// Middleware pour parser le JSON et les URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/rapports", require("./routes/rapportRoutes"));
app.use("/api/commentaires", require("./routes/commentaireRoutes"));
app.use("/api/etudiants", require("./routes/etudiantsRoutes"));

// Gestion des erreurs 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Gestion des erreurs
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} en mode ${process.env.NODE_ENV}`);
});