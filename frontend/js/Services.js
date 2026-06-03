
// Egyetlen felelősség: API hívások

export default class Services {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async sendMessage(message) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Hálózati hiba');
            }

            const data = await response.json();
            return data.reply;

        } catch (error) {
            console.error('Service hiba:', error);
            throw error;
        }
    }
}

