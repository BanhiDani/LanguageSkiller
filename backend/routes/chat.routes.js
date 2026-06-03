// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');

// POST /api/chat végpont regisztrálása
router.post('/chat', chatController.handleChatMessage);
router.get('/health', chatController.healthCheck);
module.exports = router;