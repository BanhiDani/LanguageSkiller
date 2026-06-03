
export default class ChatView {
    constructor(container) {
        this.container = container;

        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="chat-window" id="chatWindow"></div>
            <input type="text" id="chatInput" placeholder="Írj üzenetet..." />
            <button id="sendBtn">Küldés</button>
        `;
    }

    bindEvents() {
        const input = this.container.querySelector('#chatInput');
        const button = this.container.querySelector('#sendBtn');

        const send = () => {
            const message = input.value.trim();
            if (!message) return;

            // CustomEvent 🔥
            this.container.dispatchEvent(new CustomEvent('sendMessage', {
                detail: { message }
            }));

            input.value = '';
        };

        button.addEventListener('click', send);

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') send();
        });
    }

    appendMessage(type, text) {
        const chatWindow = this.container.querySelector('#chatWindow');

        const msg = document.createElement('div');
        msg.classList.add('message', type);
        msg.innerText = text;

        chatWindow.appendChild(msg);

        // auto-scroll (UX small win)
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}
