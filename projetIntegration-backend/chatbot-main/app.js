// Importation des modules nécessaires
const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Initialisation de l'application Express
const app = express();
const port = process.env.PORT || 3001;

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Activer CORS pour permettre les requêtes provenant du frontend Angular
app.use(cors({
  origin: 'http://localhost:4200',  // Changez en fonction de l'URL de votre frontend
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

// Configuration de la clé API Google AI
const API_KEY = process.env.API_KEY;
const MODEL_NAME = "gemini-pro";

// Fonction pour interagir avec Google Generative AI
async function runChat(userInput) {
  if (!API_KEY) {
    throw new Error('API_KEY is missing. Please set it in your .env file.');
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "Hello! What's your name?" }],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  return result.response.text();
}

// Route pour recevoir les messages du chatbot
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in /chat endpoint:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Lancer le serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
