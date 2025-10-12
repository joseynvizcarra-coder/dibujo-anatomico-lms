// ============================================
// ARCHIVO 1: mentor-styles.css
// Guarda este archivo en: css/mentor-styles.css
// ============================================

/*
:root {
    --primary-dark: #2c5f66;
    --primary-light: #e8a2b8;
    --dark: #1a1a1a;
    --success: #4CAF50;
    --bg-light: #f8f9fa;
}

[data-theme="dark"] {
    --bg-light: #1a1a1a;
    --dark: #ffffff;
    --primary-dark: #3d7d86;
}

.mentor-floating-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 65px;
    height: 65px;
    background: linear-gradient(135deg, var(--primary-dark), var(--dark));
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

.mentor-floating-btn.active {
    background: var(--primary-light);
    color: var(--dark);
}

@keyframes mentor-pulse {
    0%, 100% { box-shadow: 0 4px 20px rgba(44, 95, 102, 0.5); }
    50% { box-shadow: 0 4px 30px rgba(44, 95, 102, 0.8); }
}

.mentor-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 22px;
    height: 22px;
    background: #f44336;
    color: white;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
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

[data-theme="dark"] .mentor-container {
    background: #1a1a1a;
    border: 1px solid #333;
}

@keyframes mentor-slide-up {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.mentor-header {
    background: linear-gradient(135deg, var(--primary-dark), var(--dark));
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
    background: var(--success);
    border-radius: 50%;
    animation: mentor-status-pulse 2s infinite;
}

@keyframes mentor-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.mentor-header-actions {
    display: flex;
    gap: 0.5rem;
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
    background: var(--bg-light);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.mentor-messages::-webkit-scrollbar {
    width: 6px;
}

.mentor-messages::-webkit-scrollbar-thumb {
    background: var(--primary-light);
    border-radius: 10px;
}

.mentor-message {
    display: flex;
    gap: 0.5rem;
    animation: mentor-message-slide 0.3s ease;
}

@keyframes mentor-message-slide {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
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
    background: var(--primary-dark);
    color: white;
}

.mentor-message.user .mentor-message-avatar {
    background: var(--primary-light);
    color: var(--dark);
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
}

.mentor-message.bot .mentor-message-bubble {
    background: var(--primary-dark);
    color: white;
    border-bottom-left-radius: 4px;
}

.mentor-message.user .mentor-message-bubble {
    background: var(--primary-light);
    color: var(--dark);
    border-bottom-right-radius: 4px;
}

.mentor-message-bubble h4 {
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    font-weight: 600;
}

.mentor-message-bubble ul {
    margin: 0.5rem 0;
    padding-left: 1.25rem;
}

.mentor-message-bubble li {
    margin: 0.35rem 0;
}

.mentor-message-bubble strong {
    font-weight: 600;
}

.mentor-message-section {
    margin: 0.75rem 0;
    padding-left: 0.75rem;
    border-left: 3px solid rgba(255,255,255,0.3);
}

.mentor-message.user .mentor-message-section {
    border-left-color: rgba(0,0,0,0.2);
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

.mentor-quick-action-btn {
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 0.4rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: all 0.3s;
}

.mentor-message.user .mentor-quick-action-btn {
    background: rgba(0,0,0,0.1);
    border-color: rgba(0,0,0,0.2);
    color: var(--dark);
}

.mentor-quick-action-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-1px);
}

.mentor-typing {
    display: none;
    align-items: center;
    gap: 0.5rem;
}

.mentor-typing.active {
    display: flex;
}

.mentor-typing-dots {
    background: var(--primary-dark);
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

.mentor-typing-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.mentor-typing-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes mentor-typing-bounce {
    0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
    30% { opacity: 1; transform: scale(1.2); }
}

.mentor-input-area {
    padding: 1rem;
    background: white;
    border-top: 2px solid #e0e7ff;
}

[data-theme="dark"] .mentor-input-area {
    background: #2a2a2a;
    border-top-color: #444;
}

.mentor-input-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
}

.mentor-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid var(--primary-light);
    border-radius: 18px;
    font-size: 0.9rem;
    resize: none;
    max-height: 100px;
    background: var(--bg-light);
    color: var(--dark);
    font-family: inherit;
    transition: all 0.3s;
}

.mentor-input:focus {
    outline: none;
    border-color: var(--primary-dark);
    box-shadow: 0 0 0 3px rgba(44, 95, 102, 0.1);
}

.mentor-btn-send {
    width: 40px;
    height: 40px;
    background: var(--primary-dark);
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
    background: var(--primary-light);
    color: var(--dark);
    transform: scale(1.1);
}

.mentor-btn-send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.mentor-welcome {
    text-align: center;
    padding: 2rem 1.5rem;
    color: #666;
}

[data-theme="dark"] .mentor-welcome {
    color: #aaa;
}

.mentor-welcome-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.mentor-welcome h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--dark);
}

.mentor-welcome p {
    font-size: 0.9rem;
    line-height: 1.6;
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
    }
}
*/


// ============================================
// ARCHIVO 2: mentor-script.js
// Guarda este archivo en: js/mentor-script.js
// ============================================

// Base de conocimiento expandida con conversación natural
const mentorKnowledge = {
    // CONVERSACIÓN CASUAL
    greetings: [
        {
            keywords: ["hola", "hey", "buenos días", "buenas tardes", "buenas noches", "qué tal", "saludos"],
            responses: [
                "¡Hola! 👋 Soy tu Mentor Anatómico. ¿En qué puedo ayudarte hoy?",
                "¡Hey! 😊 ¿Tienes alguna duda sobre el curso o necesitas ayuda con algo específico?",
                "¡Hola! Estoy aquí para ayudarte con anatomía, técnicas de dibujo o cualquier duda del curso. ¿Qué necesitas?"
            ],
            quickActions: ["Ver mi dashboard", "¿Qué debo hacer hoy?", "Tengo una duda técnica"]
        },
        {
            keywords: ["cómo estás", "como estas", "qué tal estás", "que tal estas", "todo bien"],
            responses: [
                "¡Muy bien, gracias por preguntar! 😊 Listo para ayudarte con tus dudas de dibujo anatómico. ¿En qué te puedo apoyar?",
                "¡De maravilla! 🤖 Siempre feliz de ayudar a estudiantes como tú. ¿Tienes alguna pregunta?",
                "¡Excelente! Aquí trabajando para ayudarte. ¿Qué necesitas saber?"
            ],
            quickActions: ["Ver mi progreso", "Ayuda con ejercicios", "Dudas del proyecto final"]
        },
        {
            keywords: ["gracias", "muchas gracias", "te agradezco", "thank you", "excelente", "perfecto", "genial"],
            responses: [
                "¡De nada! 😊 Estoy aquí cuando me necesites. ¡Éxito con tu práctica!",
                "¡Un placer ayudarte! Si tienes más dudas, aquí estaré. 🎨",
                "¡Para eso estoy! No dudes en preguntar cuando lo necesites. ¡Sigue practicando! 💪"
            ],
            quickActions: []
        },
        {
            keywords: ["adiós", "adios", "chao", "hasta luego", "nos vemos", "bye"],
            responses: [
                "¡Hasta luego! 👋 Que tengas una excelente sesión de dibujo. Vuelve cuando quieras.",
                "¡Nos vemos! 😊 Recuerda que estoy aquí 24/7 para ayudarte. ¡Éxito!",
                "¡Chao! 🎨 Sigue practicando y no dudes en volver si tienes dudas."
            ],
            quickActions: []
        },
        {
            keywords: ["ayuda", "help", "auxilio", "no entiendo", "estoy perdido", "no sé qué hacer"],
            responses: [
                "¡Claro que te ayudo! 🤝 Puedo responder dudas sobre:\n\n• Técnicas de dibujo y anatomía\n• Tu progreso y dashboard\n• Ejercicios y evaluaciones\n• Navegación del LMS\n\n¿Qué necesitas específicamente?",
                "¡Estoy aquí para eso! 💪 Puedo ayudarte con conceptos técnicos, revisar tu progreso, explicarte cómo funciona el sistema... ¿Qué te gustaría saber?"
            ],
            quickActions: ["Ver dashboard", "Dudas técnicas", "¿Cómo funciona el LMS?", "Próximos pasos"]
        }
    ],

    // DASHBOARD Y PROGRESO
    dashboard: [
        {
            keywords: ["dashboard", "panel", "mi progreso", "mi avance", "estadísticas", "cómo voy"],
            response: {
                title: "Tu Dashboard Personal",
                content: `Tu dashboard personal muestra toda tu información de progreso en tiempo real.

<div class="mentor-message-section"><strong>📊 Qué puedes ver:</strong>
• <strong>Progreso general:</strong> % del curso completado
• <strong>Por módulo:</strong> Avance en M1, M2, M3
• <strong>Lecciones:</strong> Completadas de 10 totales
• <strong>Evaluaciones:</strong> Aprobadas y pendientes
• <strong>Ejercicios:</strong> Entregados y por entregar
• <strong>Tiempo restante:</strong> Estimado para terminar</div>

<div class="mentor-message-section"><strong>🔍 Cómo acceder:</strong>
• Click en "Inicio" o el logo UAH desde cualquier página
• El dashboard se actualiza automáticamente
• Puedes volver cuando quieras</div>`,
                quickActions: ["Ver dashboard", "¿Qué sigue?", "Ver evaluaciones"]
            }
        },
        {
            keywords: ["qué debo hacer", "que debo hacer", "qué sigue", "que sigue", "próximo paso", "proximo paso", "qué hago ahora"],
            response: {
                title: "Próximos Pasos",
                content: `Déjame revisar tu progreso actual...

<div class="mentor-message-section"><strong>📍 Tu situación:</strong>
<em>(El sistema detecta automáticamente tu progreso real)</em>

Basándome en tu avance, te recomiendo:</div>

<div class="mentor-message-section"><strong>✅ Si estás en Módulo 1:</strong>
1. Completa las lecciones 1.1, 1.2, 1.3 en orden
2. Practica los croquis rápidos (2-5 min)
3. Haz la evaluación formativa del módulo
4. Avanza al Módulo 2

<strong>✅ Si estás en Módulo 2:</strong>
1. Enfócate en las 3 masas corporales
2. Practica estructura de manos y pies
3. Completa todos los ejercicios de anatomía
4. Aprueba la evaluación antes de M3

<strong>✅ Si estás en Módulo 3:</strong>
1. Domina el proceso de 4 capas
2. Practica valores tonales
3. Prepárate para el proyecto final
4. Revisa la rúbrica de evaluación</div>`,
                quickActions: ["Ver mi módulo actual", "Ir a próxima lección", "Ver calendario"]
            }
        },
        {
            keywords: ["retroalimentación", "retroalimentacion", "feedback", "comentarios", "corrección", "correccion", "evaluación", "evaluacion"],
            response: {
                title: "Tu Retroalimentación",
                content: `La retroalimentación del instructor aparece después de cada entrega importante.

<div class="mentor-message-section"><strong>📝 Tipos de retroalimentación:</strong>

<strong>1. Evaluaciones formativas (automáticas):</strong>
• Feedback inmediato al responder
• Explicación de respuestas correctas/incorrectas
• Sugerencias para mejorar

<strong>2. Ejercicios prácticos (del instructor):</strong>
• Comentarios específicos por criterio
• Fortalezas identificadas
• Áreas de mejora señaladas
• Tiempo de respuesta: 3-5 días hábiles

<strong>3. Proyecto final (evaluación detallada):</strong>
• Calificación por rúbrica (100 pts)
• Retroalimentación exhaustiva
• Sugerencias concretas si < 60 pts</div>

<div class="mentor-message-section"><strong>🔍 Dónde verla:</strong>
• En tu dashboard (sección "Retroalimentación")
• En el email asociado a tu cuenta
• En la lección específica donde entregaste</div>`,
                quickActions: ["Ver dashboard", "¿Cómo mejorar?", "Contactar instructor"]
            }
        }
    ],

    // Mantén todas las preguntas técnicas anteriores aquí...
    // (modulo1, modulo2, modulo3, sistema)
    // Por brevedad no las repito, pero deben estar
};

// Sistema de conversación
class MentorChat {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.userName = this.getUserName();
        this.currentContext = null;
        this.init();
    }

    init() {
        this.injectHTML();
        this.setupEventListeners();
        this.loadHistory();
        this.checkNotifications();
    }

    getUserName() {
        // Intenta obtener el nombre del localStorage o sesión
        return localStorage.getItem('studentName') || 'estudiante';
    }

    injectHTML() {
        const html = `
            <!-- Botón flotante -->
            <button class="mentor-floating-btn" id="mentor-open-btn" title="Mentor Anatómico">
                <i class="bi bi-robot"></i>
                <span class="mentor-badge" id="mentor-badge" style="display: none;">1</span>
            </button>

            <!-- Overlay del mentor -->
            <div class="mentor-overlay" id="mentor-overlay">
                <div class="mentor-backdrop" id="mentor-backdrop"></div>
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
                        <div class="mentor-header-actions">
                            <button class="mentor-btn-icon" id="mentor-theme-btn" title="Cambiar tema">
                                <i class="bi bi-moon-fill"></i>
                            </button>
                            <button class="mentor-btn-icon" id="mentor-close-btn" title="Cerrar">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>

                    <div class="mentor-messages" id="mentor-messages">
                        <div class="mentor-welcome">
                            <div class="mentor-welcome-icon">👋</div>
                            <h3>¡Hola${this.userName !== 'estudiante' ? ', ' + this.userName : ''}!</h3>
                            <p>Soy tu Mentor Anatómico, estoy aquí para ayudarte con dudas sobre el curso, técnicas de dibujo, anatomía y más.</p>
                            <p style="margin-top: 1rem;"><strong>Pregúntame lo que necesites 😊</strong></p>
                        </div>
                    </div>

                    <div class="mentor-typing" id="mentor-typing">
                        <div class="mentor-message-avatar" style="background: var(--primary-dark); color: white;">🤖</div>
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
                                id="mentor-input"
                                rows="1"
                                placeholder="Escribe tu mensaje..."
                            ></textarea>
                            <button class="mentor-btn-send" id="mentor-send-btn">
                                <i class="bi bi-send-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
    }

    setupEventListeners() {
        // Abrir/cerrar
        document.getElementById('mentor-open-btn').addEventListener('click', () => this.toggle());
        document.getElementById('mentor-close-btn').addEventListener('click', () => this.close());
        document.getElementById('mentor-backdrop').addEventListener('click', () => this.close());

        // Input
        const input = document.getElementById('mentor-input');
        input.addEventListener('input', () => this.autoResize(input));
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Enviar
        document.getElementById('mentor-send-btn').addEventListener('click', () => this.sendMessage());

        // Tema
        document.getElementById('mentor-theme-btn').addEventListener('click', () => this.toggleTheme());

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
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
        document.getElementById('mentor-overlay').classList.add('active');
        document.getElementById('mentor-open-btn').classList.add('active');
        document.getElementById('mentor-input').focus();
        this.hideBadge();
    }

    close() {
        this.isOpen = false;
        document.getElementById('mentor-overlay').classList.remove('active');
        document.getElementById('mentor-open-btn').classList.remove('active');
    }

    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    }

    sendMessage() {
        const input = document.getElementById('mentor-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addUserMessage(message);
        input.value = '';
        input.style.height = 'auto';

        // Buscar respuesta
        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            const response = this.findResponse(message);
            this.addBotMessage(response);
        }, 800);
    }

    findResponse(message) {
        const messageLower = message.toLowerCase();

        // Buscar en saludos y conversación casual
        for (const category of mentorKnowledge.greetings) {
            if (category.keywords.some(kw => messageLower.includes(kw))) {
                const response = Array.isArray(category.responses)
                    ? category.responses[Math.floor(Math.random() * category.responses.length)]
                    : category.responses;
                
                return {
                    type: 'simple',
                    content: response,
                    quickActions: category.quickActions || []
                };
            }
        }

        // Buscar en dashboard/progreso
        for (const item of mentorKnowledge.dashboard) {
            if (item.keywords.some(kw => messageLower.includes(kw))) {
                return {
                    type: 'detailed',
                    ...item.response
                };
            }
        }

        // Buscar en conocimiento técnico (aquí deberías incluir modulo1, modulo2, etc.)
        // ... (implementar búsqueda en base de conocimiento técnico)

        // No encontrado
        return {
            type: 'notfound',
            content: `No encontré una respuesta específica para eso. 🤔

Puedo ayudarte con:
• Dudas técnicas sobre anatomía y dibujo
• Tu dashboard y progreso
• Evaluaciones y retroalimentación
• Navegación del LMS

¿Podrías reformular tu pregunta?`,
            quickActions: ["Ver dashboard", "Dudas técnicas", "¿Cómo funciona el LMS?"]
        };
    }

    addUserMessage(text) {
        const messagesContainer = document.getElementById('mentor-messages');
        const welcome = messagesContainer.querySelector('.mentor-welcome');
        if (welcome) welcome.remove();

        const time = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        
        const messageHTML = `
            <div class="mentor-message user">
                <div class="mentor-message-content">
                    <div class="mentor-message-bubble">${this.escapeHtml(text)}</div>
                    <div class="mentor-message-time">${time}</div>
                </div>
                <div class="mentor-message-avatar">👤</div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
        this.saveToHistory('user', text);
    }

    addBotMessage(response) {
        const messagesContainer = document.getElementById('mentor-messages');
        const time = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

        let contentHTML = '';
        
        if (response.type === 'simple') {
            contentHTML = `<p>${response.content}</p>`;
        } else if (response.type === 'detailed') {
            contentHTML = `
                <h4>${response.title}</h4>
                ${response.content}
            `;
        } else if (response.type === 'notfound') {
            contentHTML = `<p>${response.content}</p>`;
        }

        const quickActionsHTML = response.quickActions && response.quickActions.length > 0
            ? `<div class="mentor-quick-actions">
                ${response.quickActions.map(action => 
                    `<button class="mentor-quick-action-btn" onclick="mentorChat.handleQuickAction('${action}')">${action}</button>`
                ).join('')}
            </div>`
            : '';

        const messageHTML = `
            <div class="mentor-message bot">
                <div class="mentor-message-avatar">🤖</div>
                <div class="mentor-message-content">
                    <div class="mentor-message-bubble">
                        ${contentHTML}
                        ${quickActionsHTML}
                    </div>
                    <div class="mentor-message-time">${time}</div>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
        this.saveToHistory('bot', response);
    }

    handleQuickAction(action) {
        const actionMap = {
            "Ver dashboard": "/index.html#dashboard",
            "Ver mi dashboard": "/index.html#dashboard",
            "Dudas técnicas": "tengo una duda técnica",
            "¿Qué debo hacer hoy?": "qué debo hacer hoy",
            "¿Cómo funciona el LMS?": "cómo funciona el sistema",
            "Ver mi progreso": "quiero ver mi progreso",
            // ... más mapeos
        };

        if (action.startsWith('/') || action.startsWith('#')) {
            window.location.href = action;
        } else {
            const message = actionMap[action] || action;
            document.getElementById('mentor-input').value = message;
            this.sendMessage();
        }
    }

    showTyping() {
        document.getElementById('mentor-typing').classList.add('active');
        this.scrollToBottom();
    }

    hideTyping() {
        document.getElementById('mentor-typing').classList.remove('active');
    }

    scrollToBottom() {
        const container = document.getElementById('mentor-messages');
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }

    toggleTheme() {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('mentor-theme', newTheme);
        
        const icon = document.querySelector('#mentor-theme-btn i');
        icon.className = newTheme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }

    showBadge(count = 1) {
        const badge = document.getElementById('mentor-badge');
        badge.textContent = count;
        badge.style.display = 'flex';
    }

    hideBadge() {
        document.getElementById('mentor-badge').style.display = 'none';
    }

    checkNotifications() {
        // Aquí puedes implementar lógica para notificar al usuario
        // Por ejemplo, si tiene retroalimentación nueva
    }

    saveToHistory(type, content) {
        this.conversationHistory.push({
            type,
            content,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('mentor-history', JSON.stringify(this.conversationHistory));
    }

    loadHistory() {
        const saved = localStorage.getItem('mentor-history');
        if (saved) {
            this.conversationHistory = JSON.parse(saved);
        }
    }

    escapeHtml(text) {
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


// ============================================
// ARCHIVO 3: snippet-para-pegar.html
// Copia esto en cada página HTML antes del </body>
// ============================================

/*
<!-- Mentor Anatómico IA - Inicio -->
<link rel="stylesheet" href="css/mentor-styles.css">
<script src="js/mentor-script.js"></script>
<!-- Mentor Anatómico IA - Fin -->
*/
