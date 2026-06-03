
export default class ChatView {

    constructor(container) {
        this.container = container;
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div id="chatWindow"></div>
            <input id="chatInput" />
            <button id="sendBtn">Küldés</button>
        `;
    }

    bindEvents() {
        const input = this.container.querySelector('#chatInput');
        const button = this.container.querySelector('#sendBtn');

        const send = () => {
            const message = input.value.trim();
            if (!message) return;

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

        const div = document.createElement('div');
        div.classList.add(type);
        div.innerText = text;

        chatWindow.appendChild(div);
    }
}
