
const fetch = require('node-fetch'); // Node <18 esetén kell

const API_KEY = process.env.GEMINI_API_KEY;

exports.generateResponse = async (message) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    const body = {
        contents: [
            {
                parts: [
                    { text: message }
                ]
            }
        ]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error('Gemini API hiba');
    }

    const data = await response.json();

    // Na itt jön a "hol van a válasz?" játék 😄
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Nincs válasz';
};
