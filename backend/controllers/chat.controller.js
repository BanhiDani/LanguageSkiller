// src/controllers/chatController.js
const geminiModel = require('../models/GeminiModel');

class ChatController {
    async handleChatMessage(req, res) {
        const { message } = req.body;

        // Egyszerű validálás: küldött-e a felhasználó szöveget?
        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Az üzenet szövege nem lehet üres!' });
        }

        try {
            // Meghívjuk a modellt az üzleti logikáért
            const reply = await geminiModel.generateResponse(message);
            
            // HTTP 200 OK és a válasz JSON formátumban
            return res.status(200).json({ reply: reply });
        } catch (error) {
            // Ha valami elromlott (pl. rossz API kulcs, hálózati hiba)
            return res.status(500).json({ 
                error: 'Belső szerverhiba történt az AI válasz generálása közben.' 
            });
        }
    }

    async healthCheck(req, res) {
        return res.status(200).json({
            status: 'UP',
            message: 'A backend REST API megfelelően működik.',
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = new ChatController();