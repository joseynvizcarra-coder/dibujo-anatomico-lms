// app.js - Lógica de la página principal (index.html)
// Compatible con el sistema auth.js de Joselyn Vizcarra

document.addEventListener('DOMContentLoaded', () => {
    
    // --- PROTECCIÓN DE LA PÁGINA ---
    // Esta función de tu auth.js se asegura de que el usuario esté logueado.
    // Si no lo está, lo redirigirá a login.html automáticamente.
    protectPage();

    // --- REFERENCIAS A ELEMENTOS DEL DOM ---
    const ui = {
        userAvatar: document.getElementById('userAvatar'),
        userName: document.getElementById('userName'),
        userRole: document.getElementById('userRole'),
        welcomeMessage: document.getElementById('welcomeMessage'),
        logoutBtn: document.getElementById('logoutBtn'),
        accessNotification: document.getElementById('accessNotification'),
        progressContainer: document.querySelector('[data-role-visibility="estudiante"]'),
        progressPercentage: document.getElementById('progressPercentage'),
        progressTextSummary: document.getElementById('progressTextSummary'),
        progressFill: document.getElementById('progressFill'),
        completedModules: document.getElementById('completedModules'),
        timeSpent: document.getElementById('timeSpent'),
        currentStreak: document.getElementById('currentStreak'),
        achievements: document.getElementById('achievements'),
        modulesGrid: document.getElementById('modulesGrid'),
        instructorDashboardBtn: document.querySelector('[data-role-visibility="instructor"]')
    };

    // --- DATOS DE LOS MÓDULOS (la estructura del curso) ---
    const moduleData = {
        1: { title: "Fundamentos y Proporción", description: "Domina las bases del dibujo anatómico con el canon de 8 cabezas y las proporciones fundamentales.", duration: "2-3 horas" },
        2: { title: "Anatomía Facial", description: "Explora las proporciones faciales, expresiones y detalles. Aprende técnicas para capturar la personalidad.", duration: "2-3 horas" },
        3: { title: "Torso y Extremidades", description: "Estudia la biomecánica del cuerpo, músculos, articulaciones y el movimiento natural de las extremidades.", duration: "3-4 horas" },
        4: { title: "Figura Completa en Movimiento", description: "Integra todos los elementos para crear poses dinámicas, narrativa visual y composiciones complejas.", duration: "3-4 horas" }
    };

    // --- FUNCIÓN PRINCIPAL DE INICIALIZACIÓN ---
    function initializeApp() {
        // Obtenemos el usuario desde tu función en auth.js
        const currentUser = getCurrentUser();
        if (!currentUser) {
            // Si por alguna razón no hay usuario (aunque protectPage ya debería haber actuado), detenemos la ejecución.
            console.error("No se pudo obtener el usuario actual. Redirigiendo a login.");
            window.location.href = 'login.html';
            return;
        }

        updateUserUI(currentUser);
        renderModules(currentUser);
        setupEventListeners();
        
        // Usamos tu función de log para registrar la visita a la página
        logUserActivity('page_view', currentUser, { page: 'home' });
    }

    // --- FUNCIONES DE RENDERIZADO Y UI ---
    function updateUserUI(user) {
        // Estas funciones ya existen en tu auth.js, pero las centralizamos aquí para claridad
        ui.userName.textContent = user.name;
        ui.userRole.textContent = getRoleDisplayName(user.role);
        if (user.picture) {
            ui.userAvatar.src = user.picture;
        }
        ui.welcomeMessage.textContent = `¡Hola, ${user.name.split(' ')[0]}!`;

        // Lógica para mostrar/ocultar elementos según el rol
        document.querySelectorAll('[data-role-visibility]').forEach(el => {
            el.style.display = (el.dataset.roleVisibility === user.role) ? 'block' : 'none';
        });

        if (user.role === 'visitante') {
            ui.accessNotification.style.display = 'block';
        }
    }

    function renderModules(user) {
        // Obtenemos el progreso del estudiante usando tu función de auth.js
        const studentProgressData = (user.role === 'estudiante') ? getStudentProgress(user.email) : null;
        
        ui.modulesGrid.innerHTML = '';
        Object.keys(moduleData).forEach((id, index) => {
            const module = moduleData[id];
            
            // Mapeamos los datos de tu sistema de progreso al formato que necesita la tarjeta
            let moduleProgress = { status: 'pending', percent: 0 };
            if (studentProgressData && studentProgressData.modules[id]) {
                const progress = studentProgressData.modules[id];
                moduleProgress.percent = progress.progress || 0;
                if (progress.completed) {
                    moduleProgress.status = 'completed';
                } else if (progress.progress > 0) {
                    moduleProgress.status = 'in-progress';
                }
            }

            const card = createModuleCard(id, module, moduleProgress, user.role);
            card.style.animationDelay = `${index * 0.1}s`;
            ui.modulesGrid.appendChild(card);
        });
        
        if (user.role === 'estudiante' && studentProgressData) {
            updateOverallProgress(studentProgressData);
        }
    }

    function createModuleCard(id, module, progress, role) {
        const card = document.createElement('div');
        card.className = `module-card status-${progress.status}`;
        card.dataset.moduleId = id;

        const statusInfo = {
            pending: { text: 'No Iniciado', class: 'status-pending' },
            'in-progress': { text: 'En Progreso', class: 'status-in-progress' },
            completed: { text: 'Completado', class: 'status-completed' }
        };

        const buttonText = (role === 'visitante') ? '👁️ Ver Demo' : (progress.status === 'completed' ? 'Revisar Módulo' : 'Comenzar Módulo');
        const buttonClass = (role === 'visitante') ? 'visitor-demo' : (progress.status === 'completed' ? 'completed' : '');
        
        card.innerHTML = `
            <div class="module-number">${id}</div>
            <h3 class="module-title">${module.title}</h3>
            <p class="module-description">${module.description}</p>
            <div class="module-meta">
                <span>⏱️ ${module.duration}</span>
                ${role === 'estudiante' ? `
                <div class="circular-progress" role="progressbar" aria-valuenow="${progress.percent}">
                    <svg viewBox="0 0 36 36">
                        <path class="circular-progress-bg" d="M18 2.08a15.92 15.92 0 0 1 0 31.84a15.92 15.92 0 0 1 0-31.84"></path>
                        <path class="circular-progress-fill" style="stroke-dashoffset: ${100 - progress.percent};" d="M18 2.08a15.92 15.92 0 0 1 0 31.84a15.92 15.92 0 0 1 0-31.84"></path>
                    </svg>
                    <div class="progress-text">${progress.percent}%</div>
                </div>` : ''}
            </div>
            <div><span class="status-badge ${statusInfo[progress.status].class}">${statusInfo[progress.status].text}</span></div>
            <button class="btn ${buttonClass}" data-module-id="${id}">${buttonText}</button>
        `;
        return card;
    }

    function updateOverallProgress(progressData) {
        const overallPercent = Math.round(progressData.overallProgress || 0);
        const completedCount = Object.values(progressData.modules).filter(m => m.completed).length;
        const totalModules = Object.keys(moduleData).length;

        ui.progressPercentage.textContent = `${overallPercent}%`;
        ui.progressFill.style.width = `${overallPercent}%`;
        ui.progressTextSummary.textContent = `${completedCount} de ${totalModules} módulos completados`;
        ui.completedModules.textContent = completedCount;

        // Aquí podrías agregar lógica para tiempo, racha y logros si los tienes en progressData
        const totalTimeHours = (progressData.totalTimeSpent / 3600).toFixed(1);
        ui.timeSpent.textContent = `${totalTimeHours}h`;
        
        ui.progressContainer.querySelector('.progress-bar').setAttribute('aria-valuenow', overallPercent);
    }

    // --- MANEJO DE EVENTOS ---
    function setupEventListeners() {
        // Usamos la función logout() de tu auth.js
        ui.logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });

        // Event delegation para los botones de los módulos
        ui.modulesGrid.addEventListener('click', (event) => {
            const button = event.target.closest('.btn[data-module-id]');
            if (button) {
                openModule(button.dataset.moduleId);
            }
        });
    }
    
    function openModule(moduleId) {
        const currentUser = getCurrentUser();
        console.log(`Abriendo módulo ${moduleId}`);
        logUserActivity('module_start', currentUser, { moduleId: moduleId });
        alert(`Navegando al módulo ${moduleId}... (Aquí iría la lógica de redirección)`);
        // En una app real, aquí redirigirías: window.location.href = `/module.html?id=${moduleId}`;
    }
    
    // --- INICIO DE LA APLICACIÓN ---
    initializeApp();
});
