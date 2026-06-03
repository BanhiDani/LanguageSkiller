
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

            const data = await response.json();

            if (!response.ok) {
                console.error("❌ Backend error:", data);
                throw new Error(data.error || 'Backend hiba');
            }

            return data.reply;

        } catch (error) {
            console.error('🔥 Service error:', error);
            throw error;
        }
    }
}
