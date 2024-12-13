const express = require('express');
const connectToDb =require("./config/connectToDb");
require("dotenv").config();
//connection to Db 
connectToDb();
 
//init app
const app = express();

// Middleware pour traiter le JSON
app.use(express.json());
//routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));

//running the server
const PORT= process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));