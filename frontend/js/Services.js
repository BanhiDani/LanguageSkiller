// Services.js
export class Services {
    constructor(baseUrl = 'http://localhost:3000/api') {
        this.baseUrl = baseUrl;
    }

    /**
     * Üzenet küldése a backend API-nak
     * @param {string} message - A felhasználó üzenete
     * @returns {Promise<Object>} - A backend (és a Gemini) válasza
     */
    async sendMessage(message) {
        try {
            const response = await fetch(`${this.baseUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Hálózati hiba történt a kommunikáció során.');
            }

            return await response.json();
        } catch (error) {
            console.error('Hiba a Services.sendMessage-ben:', error);
            throw error;
        }
    }
}
