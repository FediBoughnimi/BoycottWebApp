const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();
const cors = require('cors');
const app = express();
const session = require('express-session');
const Keycloak = require('keycloak-connect');
app.use(cors({
  origin: 'http://localhost:4200',  // Changez en fonction de l'URL de votre frontend
  methods: ['POST','GET','DELETE'],
  allowedHeaders: ['Content-Type']
}));

const memoryStore = new session.MemoryStore();
const kcConfig = {
  clientId: "boycottApp",
  serverUrl: "http://localhost:8080",
  realm: "myrealm"   };

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);
const protectedRoutes = keycloak.protect(); // protect all routes by default

// Middleware pour analyser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/contact', contactRoutes);

// Port
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
