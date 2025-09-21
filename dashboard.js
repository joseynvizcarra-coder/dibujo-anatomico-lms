// dashboard.js - Lógica para la página del instructor

document.addEventListener('DOMContentLoaded', () => {

    // --- PROTECCIÓN DE LA PÁGINA ---
    // Asegurarse de que el usuario es un instructor autenticado
    if (!isAuthenticated() || getCurrentUser()?.role !== 'instructor') {
        // Si no lo es, redirigir a la página principal o de login
        window.location.href = 'index.html';
        return;
    }

    // --- REFERENCIAS A ELEMENTOS DEL DOM ---
    const ui = {
        userName: document.getElementById('userName'),
        userRole: document.getElementById('userRole'),
        userAvatar: document.getElementById('userAvatar'),
        logoutBtn: document.getElementById('logoutBtn'),
        totalStudents: document.getElementById('totalStudents'),
        activeStudents: document.getElementById('activeStudents'),
        completedModules: document.getElementById('completedModules'),
        avgProgress: document.getElementById('avgProgress'),
        studentsTableBody: document.getElementById('studentsTableBody'),
        moduleStatsContainer: document.querySelector('.module-stats'),
        activityLog: document.getElementById('activityLog'),
        newStudentEmailInput: document.getElementById('newStudentEmail'),
        addStudentBtn: document.getElementById('addStudentBtn'),
        refreshDataBtn: document.getElementById('refreshDataBtn'),
        studentAlert: document.getElementById('studentAlert')
    };
    
    // --- FUNCIÓN PRINCIPAL DE INICIALIZACIÓN ---
    function initializeDashboard() {
        const currentUser = getCurrentUser();
        
        // Actualizar UI del header
        ui.userName.textContent = currentUser.name;
        ui.userRole.textContent = getRoleDisplayName(currentUser.role);
        if (currentUser.picture) ui.userAvatar.src = currentUser.picture;
        
        loadAndRenderData();
        setupEventListeners();
        
        logUserActivity('dashboard_access', currentUser);
    }

    // --- CARGA Y RENDERIZADO DE DATOS ---
    function loadAndRenderData() {
        // Obtener datos frescos desde auth.js
        const studentEmails = USER_CONFIG.authorizedStudents;
        const allActivities = JSON.parse(localStorage.getItem('userActivities') || '[]');
        
        const studentsData = studentEmails.map(email => ({
            email: email,
            name: email.split('@')[0], // Un nombre por defecto
            progress: getStudentProgress(email),
            lastAccess: getLastAccess(email)
        }));

        // Renderizar cada sección del dashboard
        renderMainStats(studentsData);
        renderStudentsTable(studentsData);
        renderModuleStats(studentsData);
        renderActivityLog(allActivities);
    }
    
    function renderMainStats(studentsData) {
        const totalStudents = studentsData.length;
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const activeStudents = studentsData.filter(s => s.lastAccess && new Date(s.lastAccess) > weekAgo).length;

        let totalCompletedModules = 0;
        let totalProgressSum = 0;

        studentsData.forEach(student => {
            if (student.progress) {
                totalCompletedModules += Object.values(student.progress.modules).filter(m => m.completed).length;
                totalProgressSum += student.progress.overallProgress || 0;
            }
        });

        const avgProgress = totalStudents > 0 ? Math.round(totalProgressSum / totalStudents) : 0;

        ui.totalStudents.textContent = totalStudents;
        ui.activeStudents.textContent = activeStudents;
        ui.completedModules.textContent = totalCompletedModules;
        ui.avgProgress.textContent = `${avgProgress}%`;
    }
    
    function renderStudentsTable(studentsData) {
        ui.studentsTableBody.innerHTML = '';
        if (studentsData.length === 0) {
            ui.studentsTableBody.innerHTML = '<tr><td colspan="5" class="empty-table-message">No hay estudiantes registrados.</td></tr>';
            return;
        }

        studentsData.forEach(student => {
            const progress = student.progress;
            const progressPercent = progress ? Math.round(progress.overallProgress || 0) : 0;
            const completedModules = progress ? Object.values(progress.modules).filter(m => m.completed).length : 0;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}<br><small>${student.email}</small></td>
                <td>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <span>${progressPercent}%</span>
                </td>
                <td>${completedModules} / 4</td>
                <td>${student.lastAccess ? new Date(student.lastAccess).toLocaleDateString() : 'Nunca'}</td>
                <td>
                    <button class="btn-table-action remove" data-email="${student.email}">Quitar</button>
                </td>
            `;
            ui.studentsTableBody.appendChild(row);
        });
    }
    
    function renderModuleStats(studentsData) {
        ui.moduleStatsContainer.innerHTML = '';
        for (let i = 1; i <= 4; i++) {
            const completedCount = studentsData.filter(s => s.progress?.modules[i]?.completed).length;
            const moduleStatEl = document.createElement('div');
            moduleStatEl.className = 'module-stat-item';
            moduleStatEl.innerHTML = `
                <h4>Módulo ${i}</h4>
                <div class="module-stat-number">${completedCount}</div>
                <div class="module-stat-label">Completados</div>
            `;
            ui.moduleStatsContainer.appendChild(moduleStatEl);
        }
    }
    
    function renderActivityLog(allActivities) {
        ui.activityLog.innerHTML = '';
        const recentActivities = allActivities.slice(-15).reverse();
        
        if (recentActivities.length === 0) {
            ui.activityLog.innerHTML = '<div class="activity-item-empty">No hay actividad reciente.</div>';
            return;
        }

        recentActivities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div class="activity-details">
                    <span class="activity-user">${activity.userName || activity.userEmail}</span>
                    <span class="activity-action">${getActivityDescription(activity)}</span>
                </div>
                <span class="activity-time">${formatTimeAgo(activity.timestamp)}</span>
            `;
            ui.activityLog.appendChild(item);
        });
    }

    // --- MANEJO DE EVENTOS ---
    function setupEventListeners() {
        ui.logoutBtn.addEventListener('click', (e) => { e.preventDefault(); logout(); });
        ui.refreshDataBtn.addEventListener('click', loadAndRenderData);
        ui.addStudentBtn.addEventListener('click', handleAddStudent);
        ui.studentsTableBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove')) {
                const emailToRemove = event.target.dataset.email;
                handleRemoveStudent(emailToRemove);
            }
        });
    }

    function handleAddStudent() {
        const email = ui.newStudentEmailInput.value.trim().toLowerCase();
        if (!email || !email.includes('@')) {
            showAlert('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        const success = addAuthorizedStudent(email); // Función de auth.js
        if (success) {
            showAlert(`Estudiante "${email}" agregado exitosamente.`, 'success');
            ui.newStudentEmailInput.value = '';
            loadAndRenderData();
        } else {
            showAlert(`El estudiante "${email}" ya está registrado.`, 'info');
        }
    }
    
    function handleRemoveStudent(email) {
        if (confirm(`¿Estás seguro de que quieres quitar a "${email}"? Se eliminará su progreso permanentemente.`)) {
            const success = removeAuthorizedStudent(email); // Función de auth.js
            if (success) {
                showAlert(`Estudiante "${email}" eliminado.`, 'success');
                loadAndRenderData();
            } else {
                showAlert('No se pudo eliminar al estudiante.', 'error');
            }
        }
    }

    // --- FUNCIONES AUXILIARES ---
    function showAlert(message, type = 'info') {
        ui.studentAlert.textContent = message;
        ui.studentAlert.className = `alert ${type}`;
        ui.studentAlert.style.display = 'block';
        setTimeout(() => { ui.studentAlert.style.display = 'none'; }, 4000);
    }
    
    function getActivityDescription(activity) {
        // Esta función podría expandirse para dar más detalles
        return activity.action.replace('_', ' ');
    }

    function formatTimeAgo(timestamp) {
        const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " años";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " meses";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " días";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " horas";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutos";
        return "hace segundos";
    }

    // --- INICIO DE LA APLICACIÓN DEL DASHBOARD ---
    initializeDashboard();
});
