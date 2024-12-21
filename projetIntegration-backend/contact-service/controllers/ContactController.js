const ContactMessage = require('../models/ContactMessage');
const { sendMail } = require('../services/emailService');

// Créer un message et envoyer un email de confirmation
exports.createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log('Request body:', req.body); // Vérifiez les données reçues

  // Vérification des champs requis
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Création et sauvegarde du message
    const newMessage = new ContactMessage({ name, email, subject, message });
    const savedMessage = await newMessage.save();
    console.log('Message saved:', savedMessage);

    // Contenu de l'email de confirmation
    const emailContent = `
      Dear ${name},
      
      Thank you for contacting ${process.env.APP_NAME}. Your message has been received successfully.
      
      Best regards,
      ${process.env.APP_NAME} Team
    `;

    // Envoi de l'email de confirmation
    try {
      await sendMail(email, 'Message Confirmation', emailContent);
      res.status(201).json({ success: true, message: 'Message sent successfully and email confirmation sent!' });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      res.status(500).json({ success: false, message: 'Message saved, but failed to send confirmation email.', error: emailError.message });
    }
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ success: false, message: 'Error processing your request.', error: error.message });
  }
};

// Obtenir tous les messages (admin uniquement)
exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    console.log('Messages retrieved:', messages); // Vérifiez les messages récupérés
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving messages.',
      error: error.message,
    });
  }
};

// Supprimer un message par ID
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  console.log('Message ID to delete:', id); // Vérifiez l'ID

  try {
    // Vérification et suppression du message
    const deletedMessage = await ContactMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      console.log('Message not found:', id);
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    console.log('Message deleted:', deletedMessage);
    res.status(200).json({ success: true, message: 'Message deleted successfully!' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ success: false, message: 'Error deleting message.', error: error.message });
  }
};
