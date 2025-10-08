// auth.js - Sistema de Autenticación LMS Dibujo Anatómico
// Universidad Alberto Hurtado - Joselyn Vizcarra
// Versión 2.0 - Optimizada y corregida

// ========================
// CONFIGURACIÓN GLOBAL
// ========================

const API_URL = 'https://script.google.com/macros/s/AKfycbygraW83QphICTmm9KdASa7Qax2TXABGmqLkYx5zruenWG45WeBGGFn8MnwXIscwrK4/exec';
const TOTAL_MODULES = 3; // ✅ Curso tiene 3 módulos, no 4
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 horas

// Variable global para tracking
let authInitialized = false;

// ========================
// FUNCIONES DE AUTENTICACIÓN
// ========================

/**
 * Autentica usuario con Google Sheets usando JSONP
 */
async function authenticateUser(username, password) {
    try {
        showLoading(true, 'Verificando credenciales...');
        
        // Usar JSONP para evitar CORS
        const result = await makeJSONPRequest('login', {
            username: username,
            password: password
        });
        
        if (result.success) {
            const userData = result.data;
            
            // Guardar datos del usuario en localStorage
            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('sessionStart', userData.loginTime || new Date().toISOString());
            
            // Registrar login
            await logUserActivity('login', userData, {
                timestamp: new Date().toISOString()
            });
            
            showLoading(false);
            return { success: true, user: userData };
        } else {
            showLoading(false);
            return { success: false, error: result.error || 'Credenciales incorrectas' };
        }
    } catch (error) {
        showLoading(false);
        console.error('Error de autenticación:', error);
        return { success: false, error: 'Error de conexión. Verifica tu internet.' };
    }
}

/**
 * Función helper para hacer requests JSONP
 * Maneja timeout y errores de red
 */
function makeJSONPRequest(action, params = {}) {
    return new Promise((resolve, reject) => {
        // Crear callback único
        const callbackName = 'jsonpCallback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        // Registrar callback global
        window[callbackName] = function(data) {
            delete window[callbackName];
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
            resolve(data);
        };
        
        // Construir URL con parámetros
        const queryParams = new URLSearchParams({
            action: action,
            callback: callbackName,
            ...params
        });
        
        const url = `${API_URL}?${queryParams.toString()}`;
        
        // Crear script tag
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        
        script.onerror = () => {
            delete window[callbackName];
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
            reject(new Error('Error de red al conectar con Google Sheets'));
        };
        
        // Timeout después de 15 segundos
        const timeout = setTimeout(() => {
            if (window[callbackName]) {
                delete window[callbackName];
                if (document.head.contains(script)) {
                    document.head.removeChild(script);
                }
                reject(new Error('Timeout: La solicitud tardó demasiado (15s)'));
            }
        }, 15000);
        
        // Limpiar timeout cuando se complete
        const originalCallback = window[callbackName];
        window[callbackName] = function(data) {
            clearTimeout(timeout);
            originalCallback(data);
        };
        
        document.head.appendChild(script);
    });
}

/**
 * Verifica si el usuario está autenticado (mejorada)
 */
function isAuthenticated() {
    const authFlag = localStorage.getItem('isAuthenticated') === 'true';
    const userStr = localStorage.getItem('currentUser');
    const sessionStart = localStorage.getItem('sessionStart');
    
    // Validación básica
    if (!authFlag || !userStr || userStr === 'null') {
        return false;
    }
    
    // Verificar si la sesión expiró
    if (sessionStart) {
        const sessionAge = Date.now() - new Date(sessionStart).getTime();
        if (sessionAge > SESSION_TIMEOUT) {
            console.warn('Sesión expirada');
            logout();
            return false;
        }
    }
    
    // Validar integridad del objeto usuario
    try {
        const user = JSON.parse(userStr);
        return !!(user && user.username && user.role);
    } catch (error) {
        console.error('Error validando usuario:', error);
        return false;
    }
}

/**
 * Obtiene los datos del usuario actual
 */
function getCurrentUser() {
    if (!isAuthenticated()) return null;
    
    try {
        const userStr = localStorage.getItem('currentUser');
        const user = JSON.parse(userStr);
        return user;
    } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
        return null;
    }
}

/**
 * Cierra la sesión del usuario
 */
async function logout() {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        try {
            await logUserActivity('logout', currentUser, {
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error registrando logout:', error);
        }
    }

    // Limpiar datos de sesión
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('sessionStart');

    // Redirigir a login
    window.location.href = 'login.html';
}

/**
 * Protege una página verificando autenticación y rol
 */
function protectPage(requiredRole = null) {
    const currentUser = getCurrentUser();
    
    if (!isAuthenticated() || !currentUser) {
        // No autenticado, redirigir a login
        console.warn('Usuario no autenticado, redirigiendo a login');
        window.location.href = 'login.html';
        return false;
    }

    // Si no se requiere rol específico, permitir acceso
    if (!requiredRole) {
        return true;
    }

    // Verificar rol específico
    if (currentUser.role !== requiredRole) {
        console.warn(`Rol incorrecto. Requerido: ${requiredRole}, Actual: ${currentUser.role}`);
        
        // Redirigir según el rol actual
        if (currentUser.role === 'instructor') {
            if (!window.location.pathname.includes('dashboard.html')) {
                window.location.href = 'dashboard.html';
            }
        } else {
            // Estudiante o evaluador
            if (!window.location.pathname.includes('index.html') && 
                !window.location.pathname.includes('module')) {
                window.location.href = 'index.html';
            }
        }
        return false;
    }

    return true;
}

// ========================
// SISTEMA DE PROGRESO
// ========================

/**
 * Inicializa progreso vacío para nuevo estudiante
 */
function initializeEmptyProgress() {
    return {
        modules: {
            1: { completed: false, progress: 0, timeSpent: 0, completedLessons: [], lastUpdate: null },
            2: { completed: false, progress: 0, timeSpent: 0, completedLessons: [], lastUpdate: null },
            3: { completed: false, progress: 0, timeSpent: 0, completedLessons: [], lastUpdate: null }
        },
        overallProgress: 0,
        totalTime: 0,
        lastAccess: new Date().toISOString()
    };
}

/**
 * Obtiene el progreso de un estudiante desde Google Sheets
 * Usa JSONP y maneja casos sin datos
 */
async function getStudentProgress(username = null) {
    try {
        const userToQuery = username || getCurrentUser()?.username;
        if (!userToQuery) {
            console.warn('No hay usuario para consultar progreso');
            return null;
        }

        // Usar JSONP en lugar de fetch
        const result = await makeJSONPRequest('getProgress', {
            username: userToQuery
        });

        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('No hay progreso previo, inicializando nuevo');
            return initializeEmptyProgress();
        }
    } catch (error) {
        console.error('Error obteniendo progreso:', error);
        // Devolver progreso vacío en caso de error
        return initializeEmptyProgress();
    }
}

/**
 * Actualiza el progreso de un módulo en Google Sheets
 * Versión mejorada con validaciones y manejo de errores
 */
async function updateModuleProgress(moduleNumber, progressData) {
    try {
        const currentUser = getCurrentUser();
        
        if (!currentUser) {
            console.error('No hay usuario autenticado');
            return false;
        }

        // Validar que sea estudiante (instructor puede ver pero no guardar progreso)
        if (currentUser.role !== 'estudiante') {
            console.warn('Solo estudiantes pueden guardar progreso');
            return false;
        }

        // Validar número de módulo
        if (moduleNumber < 1 || moduleNumber > TOTAL_MODULES) {
            console.error(`Módulo inválido: ${moduleNumber}. Debe ser 1-${TOTAL_MODULES}`);
            return false;
        }

        // Obtener progreso actual (o inicializar si no existe)
        let currentProgress = await getStudentProgress();
        if (!currentProgress) {
            currentProgress = initializeEmptyProgress();
        }

        // Actualizar módulo específico
        currentProgress.modules[moduleNumber] = {
            ...currentProgress.modules[moduleNumber],
            ...progressData,
            lastUpdate: new Date().toISOString()
        };

        // Calcular progreso general (3 módulos, no 4)
        const completedModules = Object.values(currentProgress.modules)
            .filter(m => m.completed).length;
        currentProgress.overallProgress = Math.round((completedModules / TOTAL_MODULES) * 100);
        currentProgress.lastAccess = new Date().toISOString();

        // Calcular tiempo total
        currentProgress.totalTime = Object.values(currentProgress.modules)
            .reduce((total, module) => total + (module.timeSpent || 0), 0);

        // Guardar en Google Sheets usando JSONP
        const result = await makeJSONPRequest('saveProgress', {
            username: currentUser.username,
            progress: JSON.stringify(currentProgress)
        });
        
        if (result.success) {
            console.log(`✅ Progreso módulo ${moduleNumber} guardado exitosamente`);
            
            // Registrar actividad
            await logUserActivity('progress_update', currentUser, {
                moduleId: moduleNumber,
                progress: progressData.progress,
                completed: progressData.completed
            });
            
            return true;
        } else {
            console.error('Error guardando progreso:', result.error);
            return false;
        }
    } catch (error) {
        console.error('Error actualizando progreso:', error);
        return false;
    }
}

/**
 * Guarda progreso local (backup en localStorage)
 */
function saveProgressLocally(moduleNumber, progressData) {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) return false;

        const storageKey = `progress_${currentUser.username}_module${moduleNumber}`;
        const data = {
            ...progressData,
            savedAt: new Date().toISOString()
        };
        
        localStorage.setItem(storageKey, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error guardando progreso local:', error);
        return false;
    }
}

/**
 * Recupera progreso local (si Google Sheets falla)
 */
function getProgressLocally(moduleNumber) {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) return null;

        const storageKey = `progress_${currentUser.username}_module${moduleNumber}`;
        const data = localStorage.getItem(storageKey);
        
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error recuperando progreso local:', error);
        return null;
    }
}

// ========================
// SISTEMA DE ACTIVIDADES
// ========================

/**
 * Registra una actividad del usuario en Google Sheets
 * Versión corregida sin duplicación de propiedad 'action'
 */
async function logUserActivity(activityType, userData, details = {}) {
    try {
        // Validar datos mínimos
        if (!userData || !userData.username) {
            console.warn('No se puede registrar actividad sin usuario');
            return false;
        }

        const activity = {
            action: 'logActivity',  // Acción para Google Sheets
            userId: userData.id || 0,
            username: userData.username,
            activityType: activityType,  // ✅ CORREGIDO: Renombrado de 'action' a 'activityType'
            moduleId: details.moduleId || details.module || '',
            lessonId: details.lessonId || details.lesson || '',
            details: JSON.stringify(details),
            sessionId: userData.sessionId || generateSessionId(),
            timestamp: new Date().toISOString()
        };

        // Usar JSONP para evitar problemas CORS
        const result = await makeJSONPRequest('logActivity', activity);
        
        if (result.success) {
            console.log(`✅ Actividad registrada: ${activityType}`);
            return true;
        } else {
            console.warn('Actividad no registrada:', result.error);
            return false;
        }
    } catch (error) {
        console.error('Error logging activity:', error);
        // No bloquear la UI por errores de logging
        return false;
    }
}

// ========================
// FUNCIONES PARA DASHBOARD
// ========================

/**
 * Obtiene todos los estudiantes y su progreso (solo instructor)
 */
async function getAllStudentsProgress() {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== 'instructor') {
            console.warn('Solo instructores pueden ver todos los estudiantes');
            return null;
        }

        const result = await makeJSONPRequest('getAllStudents', {});

        if (result.success) {
            return result.data;
        } else {
            console.error('Error obteniendo estudiantes:', result.error);
            return [];
        }
    } catch (error) {
        console.error('Error de conexión al obtener estudiantes:', error);
        return [];
    }
}

/**
 * Obtiene actividades recientes (para dashboard)
 */
async function getRecentActivities(username = null, limit = 50) {
    try {
        const params = { limit: limit };
        if (username) {
            params.username = username;
        }

        const result = await makeJSONPRequest('getActivities', params);

        if (result.success) {
            return result.data || [];
        } else {
            console.error('Error obteniendo actividades:', result.error);
            return [];
        }
    } catch (error) {
        console.error('Error de conexión al obtener actividades:', error);
        return [];
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
    userNameElements.forEach(el => {
        el.textContent = currentUser.fullName || currentUser.username;
    });

    const userEmailElements = document.querySelectorAll('.user-email');
    userEmailElements.forEach(el => {
        el.textContent = currentUser.email || '';
    });

    // Actualizar elementos específicos por ID
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole'); 
    const userAvatar = document.getElementById('userAvatar');
    const instructorName = document.getElementById('instructorName');

    if (userName) {
        userName.textContent = currentUser.fullName || currentUser.username;
    }
    
    if (userRole) {
        userRole.textContent = getRoleDisplayName(currentUser.role);
    }
    
    if (userAvatar) {
        const initial = (currentUser.fullName || currentUser.username).charAt(0).toUpperCase();
        userAvatar.textContent = initial;
    }
    
    if (instructorName) {
        instructorName.textContent = currentUser.fullName || currentUser.username;
    }
}

/**
 * Obtiene el nombre de visualización del rol
 */
function getRoleDisplayName(role) {
    const roleNames = {
        'instructor': 'Instructor',
        'estudiante': 'Estudiante',
        'evaluador': 'Evaluador'
    };
    return roleNames[role] || 'Usuario';
}

/**
 * Muestra/oculta indicador de carga
 */
function showLoading(show, message = 'Cargando...') {
    let loader = document.getElementById('globalLoader');
    
    if (show) {
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'globalLoader';
            loader.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                           background: rgba(0,0,0,0.5); z-index: 9999; 
                           display: flex; align-items: center; justify-content: center;">
                    <div style="background: white; padding: 2rem; border-radius: 10px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                        <div style="border: 3px solid #f3f3f3; border-top: 3px solid #2c5f66; 
                                   border-radius: 50%; width: 40px; height: 40px; 
                                   animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                        <div style="color: #2c5f66; font-weight: 600;">${message}</div>
                    </div>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
            document.body.appendChild(loader);
        } else {
            // Actualizar mensaje si ya existe
            const messageDiv = loader.querySelector('div > div > div:last-child');
            if (messageDiv) {
                messageDiv.textContent = message;
            }
        }
        loader.style.display = 'block';
    } else {
        if (loader) {
            loader.style.display = 'none';
        }
    }
}

/**
 * Muestra un toast de notificación
 */
function showToast(message, type = 'info') {
    const colors = {
        success: '#4CAF50',
        warning: '#FFC107',
        info: '#2196F3',
        danger: '#f44336'
    };
    
    const icons = {
        success: 'check-circle-fill',
        warning: 'exclamation-triangle-fill',
        info: 'info-circle-fill',
        danger: 'x-circle-fill'
    };
    
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    // Agregar ícono si Bootstrap Icons está disponible
    const iconHTML = typeof bootstrap !== 'undefined' 
        ? `<i class="bi bi-${icons[type]}" style="font-size: 1.25rem;"></i>`
        : '';
    
    toast.innerHTML = `
        ${iconHTML}
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Animación de salida
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Agregar estilos de animación
if (!document.getElementById('toastAnimations')) {
    const style = document.createElement('style');
    style.id = 'toastAnimations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================
// INICIALIZACIÓN
// ========================

/**
 * Inicializa el sistema de autenticación cuando se carga la página
 */
function initializeAuth() {
    try {
        // Evitar inicialización múltiple
        if (authInitialized) {
            console.log('Auth ya inicializado');
            return;
        }

        console.log('🔐 Inicializando sistema de autenticación...');

        // Verificar si la sesión ha expirado (24 horas)
        const sessionStart = localStorage.getItem('sessionStart');
        if (sessionStart) {
            const sessionAge = Date.now() - new Date(sessionStart).getTime();
            
            if (sessionAge > SESSION_TIMEOUT) {
                console.warn('⏰ Sesión expirada, cerrando sesión...');
                logout();
                return;
            }
        }

        // Actualizar UI según el rol
        updateUIForRole();

        authInitialized = true;
        console.log('✅ Sistema de autenticación inicializado correctamente');
    } catch (error) {
        console.error('❌ Error initializing auth:', error);
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
    document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
    initializeAuth();
}

// Exportar funciones globales (para compatibilidad)
window.authenticateUser = authenticateUser;
window.isAuthenticated = isAuthenticated;
window.getCurrentUser = getCurrentUser;
window.logout = logout;
window.protectPage = protectPage;
window.getStudentProgress = getStudentProgress;
window.updateModuleProgress = updateModuleProgress;
window.logUserActivity = logUserActivity;
window.getAllStudentsProgress = getAllStudentsProgress;
window.getRecentActivities = getRecentActivities;
window.showLoading = showLoading;
window.showToast = showToast;
window.makeJSONPRequest = makeJSONPRequest;

console.log('📚 auth.js v2.0 cargado - LMS Dibujo Anatómico UAH');
