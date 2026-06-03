// src/models/geminiModel.js
const { GoogleGenAI } = require('@google/genai');

// Az SDK inicializálása a környezeti változóból vett kulccsal
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

class GeminiModel {
    /**
     * Elküldi a promptot a Gemini modellnek és visszaadja a választ
     * @param {string} userMessage 
     * @returns {Promise<string>}
     */
    async generateResponse(userMessage) {
        try {
            // A legújabb, stabil alapmodell meghívása
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userMessage,
            });

            // Ellenőrizzük, hogy érkezett-e szöveges válasz
            if (response && response.text) {
                return response.text;
            }
            
            throw new Error('Nem érkezett értékelhető válasz a Gemini API-tól.');
        } catch (error) {
            console.error('Hiba a GeminiModel-ben:', error);
            throw error; // Továbbpasszoljuk a controllereknek kezelésre
        }
    }
}

module.exports = new GeminiModel();