// auth.js - Sistema de Autenticación Simplificado LMS Dibujo Anatómico
// Universidad Alberto Hurtado - Joselyn Vizcarra
// Versión simplificada con 4 roles principales

// ========================
// CONFIGURACIÓN DE USUARIOS
// ========================

const USER_CONFIG = {
    // Usuarios predefinidos para cada rol
    roles: {
        instructor: {
            email: 'joselyn.vizcarra@uah.cl',
            name: 'Joselyn Vizcarra',
            permissions: ['view_all', 'edit_all', 'dashboard', 'manage_students']
        },
        profesor: {
            email: 'profesor@uah.cl',
            name: 'Profesor Demo',
            permissions: ['view_all', 'evaluations']
        },
        estudiante: {
            email: 'estudiante@uah.cl',
            name: 'Estudiante Demo',
            permissions: ['view_content', 'track_progress', 'evaluations']
        },
        visitante: {
            email: 'visitante@demo.com',
            name: 'Usuario Visitante',
            permissions: ['view_preview']
        }
    }
};

// ========================
// FUNCIONES DE AUTENTICACIÓN
// ========================

/**
 * Verifica si el usuario está autenticado
 */
function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

/**
 * Obtiene los datos del usuario actual
 */
function getCurrentUser() {
    if (!isAuthenticated()) return null;
    try {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
        return null;
    }
}

/**
 * Obtiene el nombre de visualización del rol
 */
function getRoleDisplayName(role) {
    const roleNames = {
        'instructor': 'Instructor',
        'profesor': 'Profesor',
        'estudiante': 'Estudiante',
        'visitante': 'Visitante'
    };
    return roleNames[role] || 'Usuario';
}

/**
 * Verifica si el usuario tiene un permiso específico
 */
function hasPermission(permission) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const roleConfig = USER_CONFIG.roles[user.role];
    if (!roleConfig) return false;
    
    return roleConfig.permissions.includes(permission);
}

/**
 * Verifica si el usuario puede acceder al contenido completo
 */
function hasFullAccess() {
    const user = getCurrentUser();
    if (!user) return false;
    
    // Instructor, Profesor y Estudiante tienen acceso completo al contenido
    return ['instructor', 'profesor', 'estudiante'].includes(user.role);
}

/**
 * Verifica si el usuario puede acceder al dashboard
 */
function canAccessDashboard() {
    return hasPermission('dashboard');
}

/**
 * Cierra la sesión del usuario
 */
function logout() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        logUserActivity('logout', currentUser);
    }

    // Limpiar datos de sesión
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('sessionStart');

    // Redirigir a login
    window.location.href = 'login.html';
}

// ========================
// SISTEMA DE PROGRESO (Solo Estudiantes)
// ========================

/**
 * Inicializa el progreso para un estudiante nuevo
 */
function initializeStudentProgress(email) {
    const progressKey = `progress_${email}`;
    
    if (!localStorage.getItem(progressKey)) {
        const initialProgress = {
            modules: {
                1: { completed: false, progress: 0, timeSpent: 0, startTime: null },
                2: { completed: false, progress: 0, timeSpent: 0, startTime: null },
                3: { completed: false, progress: 0, timeSpent: 0, startTime: null },
                4: { completed: false, progress: 0, timeSpent: 0, startTime: null }
            },
            overallProgress: 0,
            totalTimeSpent: 0,
            achievements: [],
            lastActivity: new Date().toISOString()
        };
        
        localStorage.setItem(progressKey, JSON.stringify(initialProgress));
    }
}

/**
 * Obtiene el progreso de un estudiante
 */
function getStudentProgress(email = null) {
    const userEmail = email || getCurrentUser()?.email;
    if (!userEmail) return null;
    
    const progressKey = `progress_${userEmail}`;
    try {
        return JSON.parse(localStorage.getItem(progressKey) || 'null');
    } catch (error) {
        console.error('Error parsing progress data:', error);
        return null;
    }
}

/**
 * Actualiza el progreso de un módulo
 */
function updateModuleProgress(moduleNumber, progressData) {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'estudiante') return false;

    const progressKey = `progress_${currentUser.email}`;
    const progress = getStudentProgress();
    
    if (progress) {
        progress.modules[moduleNumber] = {
            ...progress.modules[moduleNumber],
            ...progressData,
            lastUpdate: new Date().toISOString()
        };

        // Calcular progreso general
        const completedModules = Object.values(progress.modules).filter(m => m.completed).length;
        progress.overallProgress = (completedModules / 4) * 100;
        progress.lastActivity = new Date().toISOString();

        // Calcular tiempo total
        progress.totalTimeSpent = Object.values(progress.modules).reduce((total, module) => {
            return total + (module.timeSpent || 0);
        }, 0);

        localStorage.setItem(progressKey, JSON.stringify(progress));
        
        // Registrar actividad
        logUserActivity('progress_update', currentUser, {
            module: moduleNumber,
            progress: progressData
        });

        return true;
    }
    return false;
}

// ========================
// SISTEMA DE ACTIVIDADES
// ========================

/**
 * Registra una actividad del usuario
 */
function logUserActivity(action, userData, details = {}) {
    try {
        const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
        
        const activity = {
            timestamp: new Date().toISOString(),
            sessionId: userData.sessionId || generateSessionId(),
            action: action,
            userEmail: userData.email,
            userName: userData.name,
            userRole: userData.role,
            details: details,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        activities.push(activity);
        
        // Mantener solo las últimas 100 actividades
        if (activities.length > 100) {
            activities.splice(0, activities.length - 100);
        }
        
        localStorage.setItem('userActivities', JSON.stringify(activities));
    } catch (error) {
        console.error('Error logging activity:', error);
    }
}

/**
 * Obtiene actividades de un usuario específico
 */
function getStudentActivities(email) {
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    return activities.filter(a => a.userEmail === email);
}

/**
 * Obtiene el último acceso de un usuario
 */
function getLastAccess(email) {
    const activities = getStudentActivities(email);
    if (activities.length === 0) return null;
    
    const relevantActivities = activities.filter(a => 
        a.action !== 'dashboard_access' || a.userRole !== 'instructor'
    );
    
    if (relevantActivities.length === 0) return null;
    return relevantActivities[relevantActivities.length - 1].timestamp;
}

// ========================
// PROTECCIÓN DE RUTAS
// ========================

/**
 * Protege una página verificando autenticación y permisos
 */
function protectPage(requiredPermission = null) {
    const currentUser = getCurrentUser();
    
    if (!isAuthenticated() || !currentUser) {
        // No autenticado, redirigir a login
        window.location.href = 'login.html';
        return false;
    }

    // Verificar permisos específicos si se requieren
    if (requiredPermission && !hasPermission(requiredPermission)) {
        // Sin permisos, redirigir a index
        alert('No tienes permisos para acceder a esta sección');
        window.location.href = 'index.html';
        return false;
    }

    return true;
}

/**
 * Actualiza la UI según el rol del usuario
 */
function updateUIForRole() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // Mostrar/ocultar elementos según el rol
    const roleSpecificElements = document.querySelectorAll('[data-role]');
    roleSpecificElements.forEach(element => {
        const allowedRoles = element.dataset.role.split(',');
        if (allowedRoles.includes(currentUser.role)) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });

    // Actualizar información del usuario en la UI
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => el.textContent = currentUser.name);

    const userEmailElements = document.querySelectorAll('.user-email');
    userEmailElements.forEach(el => el.textContent = currentUser.email);

    const userRoleElements = document.querySelectorAll('.user-role');
    userRoleElements.forEach(el => el.textContent = getRoleDisplayName(currentUser.role));

    // Actualizar elementos específicos por ID si existen
    const updateElementById = (id, value, property = 'textContent') => {
        const element = document.getElementById(id);
        if (element) element[property] = value;
    };

    updateElementById('userName', currentUser.name);
    updateElementById('userRole', getRoleDisplayName(currentUser.role));
    updateElementById('userEmail', currentUser.email);
    
    if (currentUser.picture) {
        updateElementById('userAvatar', currentUser.picture, 'src');
    }
}

// ========================
// UTILIDADES
// ========================

/**
 * Genera un ID único de sesión
 */
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Verifica la integridad de los datos
 */
function verifyDataIntegrity() {
    try {
        // Verificar que los datos de usuario sean válidos
        const user = getCurrentUser();
        if (user && (!user.email || !user.role)) {
            throw new Error('Invalid user data');
        }
        
        // Verificar que las actividades sean válidas
        const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
        if (!Array.isArray(activities)) {
            throw new Error('Invalid activities data');
        }
        
        return true;
    } catch (error) {
        console.error('Data integrity check failed:', error);
        return false;
    }
}

/**
 * Obtiene estadísticas de uso (solo instructor)
 */
function getUsageStats() {
    const currentUser = getCurrentUser();
    if (currentUser?.role !== 'instructor') return null;

    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    
    // Contar estudiantes únicos
    const uniqueStudents = [...new Set(
        activities
            .filter(a => a.userRole === 'estudiante')
            .map(a => a.userEmail)
    )];
    
    const stats = {
        totalStudents: uniqueStudents.length,
        activeStudents: 0,
        completedModules: 0,
        averageProgress: 0,
        totalActivities: activities.length,
        lastWeekActivities: 0
    };

    // Calcular estadísticas de progreso
    let totalProgress = 0;
    uniqueStudents.forEach(email => {
        const progress = getStudentProgress(email);
        if (progress) {
            totalProgress += progress.overallProgress;
            if (progress.overallProgress > 0) stats.activeStudents++;
            
            Object.values(progress.modules).forEach(module => {
                if (module.completed) stats.completedModules++;
            });
        }
    });

    stats.averageProgress = uniqueStudents.length > 0 ? totalProgress / uniqueStudents.length : 0;

    // Actividades de la última semana
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    stats.lastWeekActivities = activities.filter(
        activity => new Date(activity.timestamp) > weekAgo
    ).length;

    return stats;
}

// ========================
// INICIALIZACIÓN
// ========================

/**
 * Inicializa el sistema de autenticación cuando se carga la página
 */
function initializeAuth() {
    try {
        // Verificar si la sesión ha expirado (24 horas)
        const sessionStart = localStorage.getItem('sessionStart');
        if (sessionStart) {
            const sessionAge = Date.now() - new Date(sessionStart).getTime();
            const maxSessionAge = 24 * 60 * 60 * 1000; // 24 horas
            
            if (sessionAge > maxSessionAge) {
                logout();
                return;
            }
        }

        // Actualizar UI según el rol
        updateUIForRole();
    } catch (error) {
        console.error('Error initializing auth:', error);
        // En caso de error, limpiar datos corruptos
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
    }
}

// ========================
// INICIALIZACIÓN AUTOMÁTICA
// ========================

// Inicializar cuando se carga el script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (verifyDataIntegrity()) {
            initializeAuth();
        } else {
            // Limpiar datos corruptos y redirigir
            console.log('Datos corruptos detectados, limpiando...');
            localStorage.clear();
            window.location.href = 'login.html';
        }
    });
} else {
    if (verifyDataIntegrity()) {
        initializeAuth();
    } else {
        localStorage.clear();
        window.location.href = 'login.html';
    }
}