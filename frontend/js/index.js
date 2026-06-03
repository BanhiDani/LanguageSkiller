// index.js
import { ChatView } from './ChatView.js';
import { Services } from './Services.js';

// Inicializálás
const chatView = new ChatView('chat-app-root');
const services = new Services('http://localhost:3000/api'); // A backended címe

// Feliratkozás a ChatView saját eseményére
// Mivel az eseményt a container-en váltottuk ki, ott hallgatjuk meg
chatView.container.addEventListener('sendMessage', async (event) => {
    const userMessage = event.detail.message;

    try {
        // Megjelenítünk egy kis töltődés jelzést
        chatView.appendMessage('Rendszer', 'Gondolkodom...');

        // Meghívjuk a Services osztály segítségével a backendet
        const data = await services.sendMessage(userMessage);

        //  hozzáfűzzük a Gemini válaszát:
        chatView.appendMessage('Gemini AI', data.reply);

    } catch (error) {
        chatView.appendMessage('Hiba', 'Nem sikerült kapcsolatot létesíteni az AI-val.');
    }
});