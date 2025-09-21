// auth.js - Sistema de Autenticación LMS Dibujo Anatómico
// Universidad Alberto Hurtado - Joselyn Vizcarra
// Versión final con Client ID configurado

// ========================
// CONFIGURACIÓN OAUTH
// ========================

const CLIENT_ID = '268186288262-m7gsl01ovperqv1vq3qud33qbmqo08cq.apps.googleusercontent.com';

// ========================
// CONFIGURACIÓN DE USUARIOS
// ========================

const USER_CONFIG = {
    // Email de la instructora (Joselyn)
    instructorEmails: [
        'joselyn.vizcarra@uah.cl',
        'jvizcarra@uah.cl',
        'j.vizcarra@uah.cl'
    ],
    
    // Lista de estudiantes autorizados (actualizar cuando tengas los emails reales)
    authorizedStudents: [
        // Agregar aquí los emails reales de tus 17 estudiantes
        'test.estudiante1@gmail.com',
        'test.estudiante2@gmail.com',
        'test.estudiante3@gmail.com'
        // Ejemplo para cuando tengas los reales:
        // 'estudiante1@gmail.com',
        // 'estudiante2@uah.cl',
    ],
    
    // Evaluadores y académicos especiales (acceso completo pero sin datos personales)
    evaluatorEmails: [
        // Agregar emails del comité evaluador UCI cuando sea necesario
        'evaluador1@uchile.cl',
        'comite@uchile.cl'
    ]
};

// ========================
// FUNCIONES DE AUTENTICACIÓN
// ========================

/**
 * Determina el rol del usuario basado en su email
 */
function determineUserRole(email) {
    if (USER_CONFIG.instructorEmails.includes(email)) {
        return 'instructor';
    } else if (USER_CONFIG.authorizedStudents.includes(email)) {
        return 'estudiante';
    } else if (USER_CONFIG.evaluatorEmails.includes(email)) {
        return 'evaluador';
    } else {
        return 'visitante';
    }
}

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
 * Verifica si el usuario tiene permisos para acceso completo
 */
function hasFullAccess(role) {
    return ['instructor', 'estudiante', 'evaluador'].includes(role);
}

/**
 * Autentica al usuario y guarda sus datos
 */
function authenticateUser(userInfo) {
    const userData = {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture || '',
        role: determineUserRole(userInfo.email),
        loginTime: new Date().toISOString(),
        sessionId: generateSessionId()
    };

    // Guardar datos del usuario
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('sessionStart', userData.loginTime);

    // Registrar actividad de login
    logUserActivity('login', userData);

    // Inicializar progreso si es estudiante
    if (userData.role === 'estudiante') {
        initializeStudentProgress(userData.email);
    }

    return userData;
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

/**
 * Genera un ID único de sesión
 */
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ========================
// SISTEMA DE PROGRESO
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
        
        // Mantener solo las últimas 1000 actividades para no sobrecargar localStorage
        if (activities.length > 1000) {
            activities.splice(0, activities.length - 1000);
        }
        
        localStorage.setItem('userActivities', JSON.stringify(activities));
    } catch (error) {
        console.error('Error logging activity:', error);
    }
}

// ========================
// PROTECCIÓN DE RUTAS
// ========================

/**
 * Protege una página verificando autenticación
 */
function protectPage(requiredRole = null) {
    const currentUser = getCurrentUser();
    
    if (!isAuthenticated() || !currentUser) {
        // No autenticado, redirigir a login
        window.location.href = 'login.html';
        return false;
    }

    if (requiredRole && currentUser.role !== requiredRole) {
        // Rol incorrecto, redirigir según el rol actual
        switch(currentUser.role) {
            case 'instructor':
                if (window.location.pathname.includes('dashboard.html')) {
                    // Ya está en la página correcta
                    return true;
                }
                window.location.href = 'dashboard.html';
                break;
            case 'estudiante':
            case 'visitante':
            case 'evaluador':
            default:
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    // Ya está en la página correcta
                    return true;
                }
                window.location.href = 'index.html';
                break;
        }
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

    const userPictureElements = document.querySelectorAll('.user-picture');
    userPictureElements.forEach(el => {
        if (currentUser.picture) {
            el.src = currentUser.picture;
        }
    });

    // Actualizar elementos específicos por ID
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole'); 
    const userAvatar = document.getElementById('userAvatar');
    const instructorName = document.getElementById('instructorName');

    if (userName) userName.textContent = currentUser.name;
    if (userRole) userRole.textContent = getRoleDisplayName(currentUser.role);
    if (userAvatar && currentUser.picture) userAvatar.src = currentUser.picture;
    if (instructorName) instructorName.textContent = currentUser.name;
}

/**
 * Obtiene el nombre de visualización del rol
 */
function getRoleDisplayName(role) {
    const roleNames = {
        'instructor': 'Instructor',
        'estudiante': 'Estudiante',
        'evaluador': 'Evaluador',
        'visitante': 'Visitante'
    };
    return roleNames[role] || 'Usuario';
}

// ========================
// GESTIÓN DE ESTUDIANTES (Solo Instructor)
// ========================

/**
 * Agrega un nuevo estudiante autorizado (solo instructor)
 */
function addAuthorizedStudent(email) {
    const currentUser = getCurrentUser();
    if (currentUser?.role !== 'instructor') return false;

    email = email.toLowerCase().trim();
    
    if (!USER_CONFIG.authorizedStudents.includes(email)) {
        USER_CONFIG.authorizedStudents.push(email);
        localStorage.setItem('authorizedStudents', JSON.stringify(USER_CONFIG.authorizedStudents));
        
        logUserActivity('student_added', currentUser, { studentEmail: email });
        return true;
    }
    return false;
}

/**
 * Remueve un estudiante autorizado (solo instructor)
 */
function removeAuthorizedStudent(email) {
    const currentUser = getCurrentUser();
    if (currentUser?.role !== 'instructor') return false;

    const index = USER_CONFIG.authorizedStudents.indexOf(email);
    if (index > -1) {
        USER_CONFIG.authorizedStudents.splice(index, 1);
        localStorage.setItem('authorizedStudents', JSON.stringify(USER_CONFIG.authorizedStudents));
        
        // También remover datos de progreso del estudiante
        localStorage.removeItem(`progress_${email}`);
        
        logUserActivity('student_removed', currentUser, { studentEmail: email });
        return true;
    }
    return false;
}

// ========================
// UTILIDADES PARA DASHBOARD
// ========================

/**
 * Obtiene estadísticas de uso (solo instructor)
 */
function getUsageStats() {
    const currentUser = getCurrentUser();
    if (currentUser?.role !== 'instructor') return null;

    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    const students = USER_CONFIG.authorizedStudents;
    
    const stats = {
        totalStudents: students.length,
        activeStudents: 0,
        completedModules: 0,
        averageProgress: 0,
        totalActivities: activities.length,
        lastWeekActivities: 0
    };

    // Calcular estadísticas de progreso
    let totalProgress = 0;
    students.forEach(email => {
        const progress = getStudentProgress(email);
        if (progress) {
            totalProgress += progress.overallProgress;
            if (progress.overallProgress > 0) stats.activeStudents++;
            
            Object.values(progress.modules).forEach(module => {
                if (module.completed) stats.completedModules++;
            });
        }
    });

    stats.averageProgress = students.length > 0 ? totalProgress / students.length : 0;

    // Actividades de la última semana
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    stats.lastWeekActivities = activities.filter(
        activity => new Date(activity.timestamp) > weekAgo
    ).length;

    return stats;
}

/**
 * Obtiene actividades de un estudiante específico
 */
function getStudentActivities(email) {
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    return activities.filter(a => a.userEmail === email);
}

/**
 * Obtiene el último acceso de un estudiante
 */
function getLastAccess(email) {
    const activities = getStudentActivities(email);
    if (activities.length === 0) return null;
    
    // Buscar la última actividad que no sea dashboard_access del instructor
    const relevantActivities = activities.filter(a => 
        a.action !== 'dashboard_access' || a.userRole !== 'instructor'
    );
    
    if (relevantActivities.length === 0) return null;
    return relevantActivities[relevantActivities.length - 1].timestamp;
}

// ========================
// INICIALIZACIÓN
// ========================

/**
 * Inicializa el sistema de autenticación cuando se carga la página
 */
function initializeAuth() {
    try {
        // Cargar estudiantes autorizados guardados
        const savedStudents = localStorage.getItem('authorizedStudents');
        if (savedStudents) {
            const parsedStudents = JSON.parse(savedStudents);
            USER_CONFIG.authorizedStudents = [...new Set([
                ...USER_CONFIG.authorizedStudents,
                ...parsedStudents
            ])];
        }

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
// FUNCIONES GLOBALES AUXILIARES
// ========================

/**
 * Maneja errores de manera consistente
 */
function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    
    // Si es un error crítico de autenticación, hacer logout
    if (context.includes('auth') || context.includes('user')) {
        logout();
    }
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

// Inicializar cuando se carga el script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (verifyDataIntegrity()) {
            initializeAuth();
        } else {
            // Limpiar datos corruptos y redirigir
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