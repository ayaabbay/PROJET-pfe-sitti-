const express = require('express');
const connectToDb =require("./config/connectToDb");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require("dotenv").config();

//connection to Db 
connectToDb();
 
// Vérifier si le dossier "uploads" existe, sinon le créer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//init app
const app = express();

// Middleware pour traiter le JSON
app.use(express.json());

//routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/rapports", require("./routes/rapportRoute"));

//running the server
const PORT= process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));