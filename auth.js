// auth.js - Sistema de Autenticación y Gestión Central
// Universidad Alberto Hurtado - LMS Dibujo Anatómico
// Desarrollado por Joselyn Vizcarra

// ================================
// CONFIGURACIÓN GLOBAL
// ================================

const APP_CONFIG = {
    name: 'LMS Dibujo Anatómico UAH',
    version: '2.0.0',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas
    autoSaveInterval: 30000, // 30 segundos
    debugMode: true
};

// ================================
// GESTIÓN DE USUARIOS
// ================================

class UserManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.sessionId = null;
    }

    // Cargar usuarios desde localStorage
    loadUsers() {
        const defaultUsers = {
            'joselyn.vizcarra@uah.cl': {
                id: 'USR001',
                password: 'admin123',
                name: 'Joselyn Vizcarra',
                role: 'admin',
                permissions: ['all'],
                avatar: '👩‍🏫',
                created: '2024-01-01'
            },
            'estudiante1@uah.cl': {
                id: 'USR002',
                password: 'est123',
                name: 'María González',
                role: 'student',
                permissions: ['view_content', 'submit_tasks'],
                avatar: '👩‍🎓',
                created: '2024-01-10'
            },
            'estudiante2@uah.cl': {
                id: 'USR003',
                password: 'est123',
                name: 'Carlos Rodríguez',
                role: 'student',
                permissions: ['view_content', 'submit_tasks'],
                avatar: '👨‍🎓',
                created: '2024-01-11'
            },
            'profesor@uah.cl': {
                id: 'USR004',
                password: 'prof123',
                name: 'Dr. Roberto Méndez',
                role: 'instructor',
                permissions: ['view_content', 'view_students', 'grade'],
                avatar: '👨‍🏫',
                created: '2024-01-05'
            },
            'invitado@demo.com': {
                id: 'USR005',
                password: 'demo123',
                name: 'Usuario Invitado',
                role: 'guest',
                permissions: ['view_demo'],
                avatar: '👤',
                created: '2024-01-15'
            }
        };

        const savedUsers = localStorage.getItem('systemUsers');
        if (savedUsers) {
            return { ...defaultUsers, ...JSON.parse(savedUsers) };
        }
        
        localStorage.setItem('systemUsers', JSON.stringify(defaultUsers));
        return defaultUsers;
    }

    // Autenticar usuario
    authenticate(email, password) {
        const user = this.users[email];
        
        if (!user || user.password !== password) {
            return { success: false, error: 'Credenciales inválidas' };
        }

        // Crear sesión
        this.currentUser = {
            ...user,
            email: email,
            loginTime: new Date().toISOString()
        };
        
        delete this.currentUser.password; // No guardar password en sesión
        
        this.sessionId = this.generateSessionId();
        this.saveSession();

        // Registrar actividad
        ActivityLogger.log('login', { userId: user.id, email: email });

        return { success: true, user: this.currentUser };
    }

    // Generar ID de sesión único
    generateSessionId() {
        return 'SES_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Guardar sesión
    saveSession() {
        const sessionData = {
            user: this.currentUser,
            sessionId: this.sessionId,
            timestamp: Date.now()
        };
        
        localStorage.setItem('currentSession', JSON.stringify(sessionData));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    // Verificar sesión activa
    checkSession() {
        const sessionData = localStorage.getItem('currentSession');
        
        if (!sessionData) return false;
        
        const session = JSON.parse(sessionData);
        const elapsed = Date.now() - session.timestamp;
        
        if (elapsed > APP_CONFIG.sessionTimeout) {
            this.logout();
            return false;
        }
        
        this.currentUser = session.user;
        this.sessionId = session.sessionId;
        
        return true;
    }

    // Cerrar sesión
    logout() {
        if (this.currentUser) {
            ActivityLogger.log('logout', { userId: this.currentUser.id });
        }
        
        this.currentUser = null;
        this.sessionId = null;
        
        localStorage.removeItem('currentSession');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('moduleProgress');
    }

    // Obtener usuario actual
    getCurrentUser() {
        if (!this.currentUser && this.checkSession()) {
            return this.currentUser;
        }
        return this.currentUser;
    }

    // Verificar permisos
    hasPermission(permission) {
        if (!this.currentUser) return false;
        
        if (this.currentUser.role === 'admin') return true;
        
        return this.currentUser.permissions.includes(permission);
    }

    // Agregar nuevo usuario (solo admin)
    addUser(userData) {
        if (!this.hasPermission('all')) {
            return { success: false, error: 'Sin permisos' };
        }

        const email = userData.email;
        
        if (this.users[email]) {
            return { success: false, error: 'El usuario ya existe' };
        }

        this.users[email] = {
            id: 'USR' + Date.now(),
            ...userData,
            created: new Date().toISOString()
        };

        localStorage.setItem('systemUsers', JSON.stringify(this.users));
        ActivityLogger.log('user_added', { addedUser: email });

        return { success: true };
    }

    // Eliminar usuario (solo admin)
    removeUser(email) {
        if (!this.hasPermission('all')) {
            return { success: false, error: 'Sin permisos' };
        }

        if (!this.users[email]) {
            return { success: false, error: 'Usuario no encontrado' };
        }

        delete this.users[email];
        localStorage.setItem('systemUsers', JSON.stringify(this.users));
        ActivityLogger.log('user_removed', { removedUser: email });

        // Eliminar progreso del usuario
        ProgressManager.clearUserProgress(email);

        return { success: true };
    }

    // Obtener lista de usuarios (solo admin/instructor)
    getUsers(role = null) {
        if (!this.hasPermission('view_students') && !this.hasPermission('all')) {
            return [];
        }

        const userList = Object.entries(this.users).map(([email, user]) => ({
            email,
            ...user,
            password: undefined // No exponer passwords
        }));

        if (role) {
            return userList.filter(u => u.role === role);
        }

        return userList;
    }
}

// ================================
// GESTIÓN DE PROGRESO
// ================================

class ProgressManager {
    constructor() {
        this.progressData = this.loadProgress();
    }

    // Cargar datos de progreso
    loadProgress() {
        const saved = localStorage.getItem('allProgress');
        return saved ? JSON.parse(saved) : {};
    }

    // Guardar progreso
    saveProgress() {
        localStorage.setItem('allProgress', JSON.stringify(this.progressData));
    }

    // Obtener progreso de un usuario
    getUserProgress(userId) {
        if (!this.progressData[userId]) {
            this.progressData[userId] = this.initializeProgress();
        }
        return this.progressData[userId];
    }

    // Inicializar progreso nuevo
    initializeProgress() {
        return {
            modules: {
                1: { status: 'not-started', percentage: 0, timeSpent: 0, attempts: 0, lastAccess: null },
                2: { status: 'not-started', percentage: 0, timeSpent: 0, attempts: 0, lastAccess: null },
                3: { status: 'not-started', percentage: 0, timeSpent: 0, attempts: 0, lastAccess: null },
                4: { status: 'not-started', percentage: 0, timeSpent: 0, attempts: 0, lastAccess: null }
            },
            overallProgress: 0,
            totalTimeSpent: 0,
            achievements: [],
            startDate: new Date().toISOString(),
            lastActivity: null
        };
    }

    // Actualizar progreso de módulo
    updateModuleProgress(userId, moduleId, data) {
        const progress = this.getUserProgress(userId);
        
        // Actualizar datos del módulo
        Object.assign(progress.modules[moduleId], data);
        progress.modules[moduleId].lastAccess = new Date().toISOString();

        // Determinar estado
        if (data.percentage >= 100) {
            progress.modules[moduleId].status = 'completed';
            this.checkAchievements(userId, moduleId);
        } else if (data.percentage > 0) {
            progress.modules[moduleId].status = 'in-progress';
        }

        // Calcular progreso general
        let totalProgress = 0;
        let totalTime = 0;
        
        Object.values(progress.modules).forEach(module => {
            totalProgress += module.percentage || 0;
            totalTime += module.timeSpent || 0;
        });

        progress.overallProgress = Math.round(totalProgress / 4);
        progress.totalTimeSpent = totalTime;
        progress.lastActivity = new Date().toISOString();

        this.progressData[userId] = progress;
        this.saveProgress();

        // Registrar actividad
        ActivityLogger.log('progress_update', {
            userId,
            moduleId,
            percentage: data.percentage
        });

        return progress;
    }

    // Verificar logros
    checkAchievements(userId, moduleId) {
        const progress = this.getUserProgress(userId);
        const achievements = progress.achievements || [];

        // Logro por completar módulo
        const moduleAchievement = `module_${moduleId}_completed`;
        if (!achievements.includes(moduleAchievement)) {
            achievements.push(moduleAchievement);
            this.notifyAchievement(userId, `¡Módulo ${moduleId} completado!`);
        }

        // Logro por completar todos los módulos
        const allCompleted = Object.values(progress.modules).every(m => m.status === 'completed');
        if (allCompleted && !achievements.includes('course_completed')) {
            achievements.push('course_completed');
            this.notifyAchievement(userId, '¡Curso completado! 🎉');
        }

        progress.achievements = achievements;
        this.saveProgress();
    }

    // Notificar logro
    notifyAchievement(userId, message) {
        if (window.showNotification) {
            window.showNotification(message, 'success');
        }
        console.log(`Achievement for ${userId}: ${message}`);
    }

    // Limpiar progreso de usuario
    static clearUserProgress(email) {
        const allProgress = JSON.parse(localStorage.getItem('allProgress') || '{}');
        delete allProgress[email];
        localStorage.setItem('allProgress', JSON.stringify(allProgress));
    }

    // Obtener estadísticas generales (admin)
    getOverallStats() {
        const stats = {
            totalStudents: 0,
            activeStudents: 0,
            completedModules: 0,
            averageProgress: 0,
            totalTimeSpent: 0
        };

        Object.values(this.progressData).forEach(userProgress => {
            stats.totalStudents++;
            
            if (userProgress.lastActivity) {
                const daysSinceActivity = (Date.now() - new Date(userProgress.lastActivity)) / (1000 * 60 * 60 * 24);
                if (daysSinceActivity < 7) stats.activeStudents++;
            }

            Object.values(userProgress.modules).forEach(module => {
                if (module.status === 'completed') stats.completedModules++;
            });

            stats.averageProgress += userProgress.overallProgress || 0;
            stats.totalTimeSpent += userProgress.totalTimeSpent || 0;
        });

        if (stats.totalStudents > 0) {
            stats.averageProgress = Math.round(stats.averageProgress / stats.totalStudents);
        }

        return stats;
    }
}

// ================================
// REGISTRO DE ACTIVIDADES
// ================================

class ActivityLogger {
    static log(action, data = {}) {
        const activities = JSON.parse(localStorage.getItem('systemActivities') || '[]');
        
        const activity = {
            id: 'ACT_' + Date.now(),
            timestamp: new Date().toISOString(),
            action: action,
            data: data,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        activities.push(activity);

        // Mantener solo las últimas 1000 actividades
        if (activities.length > 1000) {
            activities.splice(0, activities.length - 1000);
        }

        localStorage.setItem('systemActivities', JSON.stringify(activities));
    }

    static getActivities(filters = {}) {
        const activities = JSON.parse(localStorage.getItem('systemActivities') || '[]');
        
        let filtered = activities;

        if (filters.userId) {
            filtered = filtered.filter(a => a.data.userId === filters.userId);
        }

        if (filters.action) {
            filtered = filtered.filter(a => a.action === filters.action);
        }

        if (filters.dateFrom) {
            filtered = filtered.filter(a => new Date(a.timestamp) >= new Date(filters.dateFrom));
        }

        if (filters.dateTo) {
            filtered = filtered.filter(a => new Date(a.timestamp) <= new Date(filters.dateTo));
        }

        return filtered.reverse(); // Más recientes primero
    }

    static getRecentActivities(limit = 10) {
        const activities = this.getActivities();
        return activities.slice(0, limit);
    }
}

// ================================
// UTILIDADES GLOBALES
// ================================

// Formatear fecha
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
}

// Formatear tiempo
function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
}

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Generar contraseña temporal
function generateTempPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// ================================
// INICIALIZACIÓN
// ================================

// Instancias globales
let userManager;
let progressManager;

// Inicializar sistema
function initializeAuthSystem() {
    userManager = new UserManager();
    progressManager = new ProgressManager();

    // Verificar sesión existente
    if (userManager.checkSession()) {
        console.log('Sesión activa:', userManager.getCurrentUser());
    }

    // Auto-guardar progreso
    setInterval(() => {
        if (userManager.getCurrentUser()) {
            progressManager.saveProgress();
        }
    }, APP_CONFIG.autoSaveInterval);

    // Debug mode
    if (APP_CONFIG.debugMode) {
        window.authDebug = {
            userManager,
            progressManager,
            ActivityLogger,
            viewStorage: () => {
                console.log('Users:', localStorage.getItem('systemUsers'));
                console.log('Progress:', localStorage.getItem('allProgress'));
                console.log('Activities:', localStorage.getItem('systemActivities'));
                console.log('Session:', localStorage.getItem('currentSession'));
            },
            clearAll: () => {
                if (confirm('¿Limpiar todos los datos?')) {
                    localStorage.clear();
                    location.reload();
                }
            }
        };
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuthSystem);
} else {
    initializeAuthSystem();
}

// ================================
// EXPORTAR FUNCIONES PÚBLICAS
// ================================

// Hacer disponibles globalmente
window.AuthSystem = {
    login: (email, password) => userManager.authenticate(email, password),
    logout: () => {
        userManager.logout();
        window.location.href = 'login.html';
    },
    getCurrentUser: () => userManager.getCurrentUser(),
    checkSession: () => userManager.checkSession(),
    hasPermission: (perm) => userManager.hasPermission(perm),
    addUser: (data) => userManager.addUser(data),
    removeUser: (email) => userManager.removeUser(email),
    getUsers: (role) => userManager.getUsers(role),
    updateProgress: (userId, moduleId, data) => progressManager.updateModuleProgress(userId, moduleId, data),
    getUserProgress: (userId) => progressManager.getUserProgress(userId),
    getStats: () => progressManager.getOverallStats(),
    getActivities: (filters) => ActivityLogger.getActivities(filters),
    getRecentActivities: (limit) => ActivityLogger.getRecentActivities(limit)
};

// Funciones helper globales
window.formatDate = formatDate;
window.formatTime = formatTime;
window.validateEmail = validateEmail;
window.generateTempPassword = generateTempPassword;