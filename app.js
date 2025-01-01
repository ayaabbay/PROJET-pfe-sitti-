const express = require('express');
const connectToDb = require("./config/connectToDb");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require("dotenv").config();

// Connection à la base de données
connectToDb();

// Vérifier si le dossier "uploads" existe, sinon le créer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Initialisation de l'application
const app = express();

app.use('/api/rapports', require('./routes/rapportRoutes'));



// Middleware pour parser le JSON et les URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour gérer CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/rapports", require("./routes/rapportRoutes"));

// Gestion des erreurs 404
app.use((req, res, next) => {
    const error = new Error('Route non trouvée');
    error.status = 404;
    next(error);
});

// Gestionnaire d'erreurs global
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