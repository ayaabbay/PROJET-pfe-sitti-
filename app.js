const express = require('express');
const connectToDb = require("./config/connectToDb");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const socketIo = require('socket.io');
require("dotenv").config();
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Connection à la base de données
connectToDb();

// Vérifier si le dossier "uploads" existe, sinon le créer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
app.use(express.json());

app.use(cors());

//routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/rapports", require("./routes/rapportRoute"));
app.use('/api/notifications', require('./routes/notificationRoute'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Exécuter le serveur
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Set up socket.io with the server
const io = require('socket.io')(server, {
  cors: {
    origin: '*',  // Allow all origins, you can replace with specific URLs in production
    methods: ["GET", "POST"],
  }
});

// Middleware to authenticate the user with JWT token
io.use((socket, next) => {
  const token = socket.handshake.query.token;  // Retrieve the token from the handshake auth field
  
  if (token) {
    try {
      console.log("catched token : ",token)
      const decoded = jwt.verify(token, 'privateKey123456789');
      console.log(decoded)  // Verify the token using your secret key
      socket.userId = decoded.id;  // Save the user ID for later use
      next();  // Proceed with the connection
    } catch (error) {
      console.error('Invalid or expired token');
      next(new Error('Authentication error'));  // Disconnect if the token is invalid
    }
  } else {
    next(new Error('No token provided'));
  }
});

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.userId} with socket ID: ${socket.id}`);
  
  // Listening for incoming messages
  socket.on('message', (data) => {
    console.log(`Message from user ${socket.userId}: ${data.message}`);
    
    // Broadcasting the message to all connected clients
    io.emit('message', { userId: socket.userId, message: data.message });
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId}`);
  });
});





