
const geminiModel = require('../models/gemini.model');

exports.handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        // Validáció (igen, fontos… nem, nem hagyjuk ki)
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: 'Érvénytelen üzenet'
            });
        }

        // Modell hívása
        const response = await geminiModel.generateResponse(message);

        res.json({ reply: response });

    } catch (error) {
        console.error('Controller hiba:', error);

        res.status(500).json({
            error: 'Szerver hiba'
        });
    }
};
