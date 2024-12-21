const mongoose = require('mongoose');

// Définir le schéma pour les messages de contact
const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},
{timestamps:true});

// Exporter le modèle
module.exports = mongoose.model('ContactMessage', contactMessageSchema);
