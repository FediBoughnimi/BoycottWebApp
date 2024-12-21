const express = require('express');
const router = express.Router();
const contactController = require('../controllers/ContactController');

// Routes pour le CRUD
router.post('/send', contactController.createMessage); // POST: Envoyer un message
router.get('/messages', contactController.getMessages); // GET: Obtenir tous les messages
router.delete('/messages/:id', contactController.deleteMessage); // DELETE: Supprimer un message

module.exports = router;
