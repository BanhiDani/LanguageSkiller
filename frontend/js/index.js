
import Services from './Services.js';
import ChatView from './ChatView.js';

const app = document.getElementById('app');

const chatView = new ChatView(app);
const services = new Services('http://localhost:3000');

// Esemény figyelés
app.addEventListener('sendMessage', async (e) => {
    const { message } = e.detail;

    chatView.appendMessage('user', message);

    try {
        const reply = await services.sendMessage(message);
        chatView.appendMessage('bot', reply);
    } catch (err) {
        chatView.appendMessage('system', 'Hiba történt');
    }
});
