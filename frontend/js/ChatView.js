// ChatView.js
export class ChatView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        
        // DOM elemek kigyűjtése
        this.chatWindow = this.container.querySelector('.chat-window');
        this.inputField = this.container.querySelector('.chat-input');
        this.sendButton = this.container.querySelector('.send-btn');

        // Eseménykezelők bekötése
        this.initListeners();
    }

    // Egyszerű HTML struktúra felépítése
    render() {
        this.container.innerHTML = `
            <div class="chat-container" >
                <div class="chat-window" ></div>
                <div class="chat-input-area" >
                    <input type="text" class="chat-input" placeholder="Írj egy üzenetet..." >
                    <button class="send-btn" >Küldés</button>
                </div>
            </div>
        `;
    }

    initListeners() {
        // Kattintás a küldés gombra
        this.sendButton.addEventListener('click', () => this.handleSend());

        // Enter billentyű leütése a beviteli mezőben
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
    }

    handleSend() {
        const messageText = this.inputField.value.trim();
        if (!messageText) return;

        // Megjelenítjük a felhasználó üzenetét a chaten azonnal
        this.appendMessage('Felhasználó', messageText);
        this.inputField.value = ''; // Mező ürítése

        // Saját (Custom) esemény kiváltása, amit az index.js fog elkapni
        // Átadjuk az üzenet szövegét a detail objektumban
        const messageEvent = new CustomEvent('sendMessage', {
            detail: { message: messageText }
        });
        
        this.container.dispatchEvent(messageEvent);
    }

    /**
     * Új üzenet buborék hozzáadása a chat ablakhoz
     */
    appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.style.margin = '5px 0';
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        this.chatWindow.appendChild(msgDiv);
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight; // Gördülés az aljára
    }
}