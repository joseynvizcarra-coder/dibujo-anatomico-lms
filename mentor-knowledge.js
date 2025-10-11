<!-- ============================================
     MENTOR ANATÓMICO EMOCIONAL - VERSIÓN 2.0
     Pega este BLOQUE COMPLETO antes del </body> en index.html
     REEMPLAZA el código del mentor anterior
     ============================================ -->

<style>
/* ========== ESTILOS DEL MENTOR (MISMO QUE ANTES) ========== */
:root {
    --mentor-primary-dark: #2c5f66;
    --mentor-primary-light: #e8a2b8;
    --mentor-dark: #1a1a1a;
    --mentor-success: #4CAF50;
    --mentor-warning: #FFC107;
    --mentor-danger: #f44336;
    --mentor-bg-light: #f8f9fa;
}

.mentor-floating-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 65px;
    height: 65px;
    background: linear-gradient(135deg, var(--mentor-primary-dark), var(--mentor-dark));
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 2rem;
    box-shadow: 0 4px 20px rgba(44, 95, 102, 0.5);
    cursor: pointer;
    z-index: 9997;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    animation: mentor-pulse 3s infinite;
}

.mentor-floating-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(44, 95, 102, 0.7);
}

@keyframes mentor-pulse {
    0%, 100% { box-shadow: 0 4px 20px rgba(44, 95, 102, 0.5); }
    50% { box-shadow: 0 4px 30px rgba(44, 95, 102, 0.8); }
}

.mentor-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.mentor-overlay.active {
    display: flex;
    opacity: 1;
}

.mentor-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
}

.mentor-container {
    position: absolute;
    bottom: 6rem;
    right: 2rem;
    width: 420px;
    height: 600px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: mentor-slide-up 0.3s ease;
}

@keyframes mentor-slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.mentor-header {
    background: linear-gradient(135deg, var(--mentor-primary-dark), var(--mentor-dark));
    color: white;
    padding: 1rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mentor-header-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.mentor-avatar {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.mentor-header-text h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
}

.mentor-status {
    font-size: 0.8rem;
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.mentor-status-dot {
    width: 7px;
    height: 7px;
    background: var(--mentor-success);
    border-radius: 50%;
    animation: mentor-status-pulse 2s infinite;
}

@keyframes mentor-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.mentor-btn-icon {
    width: 32px;
    height: 32px;
    background: rgba(255,255,255,0.2);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.mentor-btn-icon:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.1);
}

.mentor-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    background: var(--mentor-bg-light);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.mentor-messages::-webkit-scrollbar {
    width: 6px;
}

.mentor-messages::-webkit-scrollbar-thumb {
    background: var(--mentor-primary-light);
    border-radius: 10px;
}

.mentor-message {
    display: flex;
    gap: 0.5rem;
    animation: mentor-message-slide 0.3s ease;
}

@keyframes mentor-message-slide {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.mentor-message.user {
    flex-direction: row-reverse;
}

.mentor-message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.mentor-message.bot .mentor-message-avatar {
    background: var(--mentor-primary-dark);
    color: white;
}

.mentor-message.user .mentor-message-avatar {
    background: var(--mentor-primary-light);
    color: var(--mentor-dark);
}

.mentor-message-content {
    max-width: 75%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.mentor-message-bubble {
    padding: 0.875rem 1rem;
    border-radius: 15px;
    line-height: 1.5;
    font-size: 0.9rem;
    white-space: pre-wrap;
}

.mentor-message.bot .mentor-message-bubble {
    background: var(--mentor-primary-dark);
    color: white;
    border-bottom-left-radius: 4px;
}

.mentor-message.user .mentor-message-bubble {
    background: var(--mentor-primary-light);
    color: var(--mentor-dark);
    border-bottom-right-radius: 4px;
}

.mentor-message-bubble strong {
    font-weight: 600;
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.mentor-message-time {
    font-size: 0.7rem;
    opacity: 0.7;
    align-self: flex-end;
}

.mentor-message.user .mentor-message-time {
    align-self: flex-start;
}

.mentor-quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
}

.mentor-quick-btn {
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 0.4rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.3s;
}

.mentor-quick-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-1px);
}

.mentor-typing {
    display: none;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem 0.5rem 1rem;
}

.mentor-typing.active {
    display: flex;
}

.mentor-typing-dots {
    background: var(--mentor-primary-dark);
    padding: 0.75rem 1rem;
    border-radius: 15px;
    display: flex;
    gap: 0.4rem;
}

.mentor-typing-dot {
    width: 7px;
    height: 7px;
    background: white;
    border-radius: 50%;
    animation: mentor-typing-bounce 1.4s infinite;
}

.mentor-typing-dot:nth-child(2) { animation-delay: 0.2s; }
.mentor-typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes mentor-typing-bounce {
    0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
    30% { opacity: 1; transform: scale(1.2); }
}

.mentor-input-area {
    padding: 1rem;
    background: white;
    border-top: 2px solid #e0e7ff;
}

.mentor-input-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
}

.mentor-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid var(--mentor-primary-light);
    border-radius: 18px;
    font-size: 0.9rem;
    resize: none;
    max-height: 100px;
    background: white;
    color: var(--mentor-dark);
    font-family: inherit;
    transition: all 0.3s;
}

.mentor-input:focus {
    outline: none;
    border-color: var(--mentor-primary-dark);
    box-shadow: 0 0 0 3px rgba(44, 95, 102, 0.1);
}

.mentor-btn-send {
    width: 40px;
    height: 40px;
    background: var(--mentor-primary-dark);
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1.1rem;
}

.mentor-btn-send:hover {
    background: var(--mentor-primary-light);
    color: var(--mentor-dark);
    transform: scale(1.1);
}

.mentor-welcome {
    text-align: center;
    padding: 2rem 1.5rem;
    color: #666;
}

.mentor-welcome-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.mentor-welcome h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--mentor-dark);
}

.mentor-welcome p {
    font-size: 0.9rem;
    line-height: 1.6;
}

/* Alerta contextual */
.mentor-context-alert {
    background: linear-gradient(135deg, #fff3cd, #ffeaa7);
    border-left: 4px solid var(--mentor-warning);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.85rem;
    color: #856404;
    animation: mentor-slide-down 0.3s ease;
}

@keyframes mentor-slide-down {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .mentor-container {
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        border-radius: 0;
    }
    
    .mentor-floating-btn {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 60px;
        height: 60px;
        font-size: 1.8rem;
    }
}
</style>

<script src="mentor-knowledge.js"></script>

<script>
// ========== MENTOR ANATÓMICO 2.0 - SISTEMA COMPLETO ==========
(function() {
    'use strict';
    
    console.log('🤖 Mentor Anatómico 2.0: Inicializando...');
    
    // Cargar el sistema de conocimiento desde el archivo externo
    // (Usa el código que creé arriba en mentor_emotional_system)
    
    class MentorChat {
        constructor() {
            this.isOpen = false;
            this.memory = new window.mentorKnowledge.ConversationMemory();
            this.init();
        }
        
        init() {
            console.log('🤖 Mentor: Creando interfaz...');
            this.injectHTML();
            this.setupEvents();
            console.log('✅ Mentor: Listo!');
        }
        
        injectHTML() {
            const html = `
                <button class="mentor-floating-btn" id="mentorBtn" title="Mentor Anatómico">
                    🤖
                </button>
                
                <div class="mentor-overlay" id="mentorOverlay">
                    <div class="mentor-backdrop" id="mentorBackdrop"></div>
                    <div class="mentor-container">
                        <div class="mentor-header">
                            <div class="mentor-header-info">
                                <div class="mentor-avatar">🤖</div>
                                <div class="mentor-header-text">
                                    <h3>Mentor Anatómico</h3>
                                    <div class="mentor-status">
                                        <span class="mentor-status-dot"></span>
                                        <span>Online · Siempre disponible</span>
                                    </div>
                                </div>
                            </div>
                            <button class="mentor-btn-icon" id="mentorClose" title="Cerrar">
                                ✕
                            </button>
                        </div>
                        
                        <div class="mentor-messages" id="mentorMessages">
                            <div class="mentor-welcome">
                                <div class="mentor-welcome-icon">👋</div>
                                <h3>¡Hola!</h3>
                                <p>Soy tu Mentor Anatómico 2.0. Ahora puedo entender mejor tus emociones y ayudarte de forma más personal.</p>
                                <p style="margin-top: 1rem;"><strong>Cuéntame cómo te sientes o qué necesitas 💙</strong></p>
                            </div>
                        </div>
                        
                        <div class="mentor-typing" id="mentorTyping">
                            <div class="mentor-message-avatar" style="background: var(--mentor-primary-dark); color: white;">🤖</div>
                            <div class="mentor-typing-dots">
                                <div class="mentor-typing-dot"></div>
                                <div class="mentor-typing-dot"></div>
                                <div class="mentor-typing-dot"></div>
                            </div>
                        </div>
                        
                        <div class="mentor-input-area">
                            <div class="mentor-input-wrapper">
                                <textarea 
                                    class="mentor-input" 
                                    id="mentorInput"
                                    rows="1"
                                    placeholder="Escribe tu mensaje..."
                                ></textarea>
                                <button class="mentor-btn-send" id="mentorSend">
                                    ➤
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', html);
        }
        
        setupEvents() {
            document.getElementById('mentorBtn').addEventListener('click', () => this.toggle());
            document.getElementById('mentorClose').addEventListener('click', () => this.close());
            document.getElementById('mentorBackdrop').addEventListener('click', () => this.close());
            
            document.getElementById('mentorSend').addEventListener('click', () => this.send());
            document.getElementById('mentorInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.send();
                }
            });
            
            // Auto-resize textarea
            document.getElementById('mentorInput').addEventListener('input', (e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
            });
            
            // ESC para cerrar
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) this.close();
            });
        }
        
        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }
        
        open() {
            this.isOpen = true;
            document.getElementById('mentorOverlay').classList.add('active');
            document.getElementById('mentorInput').focus();
            
            // Mostrar mensaje contextual si aplica
            this.showContextualGreeting();
            
            console.log('🤖 Mentor: Chat abierto');
        }
        
        close() {
            this.isOpen = false;
            document.getElementById('mentorOverlay').classList.remove('active');
            console.log('🤖 Mentor: Chat cerrado');
        }
        
        showContextualGreeting() {
            const greeting = this.memory.getContextualGreeting();
            if (greeting) {
                const container = document.getElementById('mentorMessages');
                const welcome = container.querySelector('.mentor-welcome');
                if (welcome) welcome.remove();
                
                setTimeout(() => {
                    this.addBotMsg({
                        text: greeting,
                        actions: ['Estoy bien', 'Sigo frustrado/a', 'Tengo una duda']
                    });
                }, 500);
            }
        }
        
        send() {
            const input = document.getElementById('mentorInput');
            const text = input.value.trim();
            
            if (!text) return;
            
            console.log('📤 Usuario:', text);
            this.addUserMsg(text);
            input.value = '';
            input.style.height = 'auto';
            
            // Simular "escribiendo"
            this.showTyping();
            
            // Generar respuesta
            setTimeout(() => {
                this.hideTyping();
                const response = window.mentorKnowledge.generateResponse(text);
                
                // Guardar en memoria
                this.memory.add(text, response.text, response.emotion, response.intensity);
                
                // Mostrar respuesta
                this.addBotMsg(response);
                
                // Si hay patrón negativo persistente, ofrecer descanso
                if (this.memory.shouldOfferBreak()) {
                    setTimeout(() => {
                        this.addContextAlert(
                            'Noto que has estado con emociones difíciles por un rato. ¿Quieres que hablemos de tomar un descanso real? Tu bienestar es importante. 💙'
                        );
                    }, 2000);
                }
            }, 1000 + Math.random() * 800); // Variar tiempo de respuesta para parecer más humano
        }
        
        addUserMsg(text) {
            const container = document.getElementById('mentorMessages');
            const welcome = container.querySelector('.mentor-welcome');
            if (welcome) welcome.remove();
            
            const time = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
            const html = `
                <div class="mentor-message user">
                    <div class="mentor-message-content">
                        <div class="mentor-message-bubble">${this.escape(text)}</div>
                        <div class="mentor-message-time">${time}</div>
                    </div>
                    <div class="mentor-message-avatar">👤</div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', html);
            this.scroll();
        }
        
        addBotMsg(response) {
            const container = document.getElementById('mentorMessages');
            const time = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
            
            // Formatear texto (mantener saltos de línea, convertir markdown básico)
            let formattedText = response.text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **negrita**
                .replace(/\n/g, '<br>'); // saltos de línea
            
            const actionsHTML = response.actions && response.actions.length > 0
                ? `<div class="mentor-quick-actions">
                    ${response.actions.map(a => `<button class="mentor-quick-btn" onclick="window.mentorChat.sendText('${this.escape(a)}')">${a}</button>`).join('')}
                   </div>`
                : '';
            
            const html = `
                <div class="mentor-message bot">
                    <div class="mentor-message-avatar">🤖</div>
                    <div class="mentor-message-content">
                        <div class="mentor-message-bubble">
                            ${formattedText}
                            ${actionsHTML}
                        </div>
                        <div class="mentor-message-time">${time}</div>
                    </div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', html);
            this.scroll();
        }
        
        addContextAlert(message) {
            const container = document.getElementById('mentorMessages');
            const html = `
                <div class="mentor-context-alert">
                    <strong>⚠️ Aviso del Mentor:</strong><br>
                    ${message}
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
            this.scroll();
        }
        
        sendText(text) {
            document.getElementById('mentorInput').value = text;
            this.send();
        }
        
        showTyping() {
            document.getElementById('mentorTyping').classList.add('active');
            this.scroll();
        }
        
        hideTyping() {
            document.getElementById('mentorTyping').classList.remove('active');
        }
        
        scroll() {
            const container = document.getElementById('mentorMessages');
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100);
        }
        
        escape(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.mentorChat = new MentorChat();
        });
    } else {
        window.mentorChat = new MentorChat();
    }
})();
</script>
