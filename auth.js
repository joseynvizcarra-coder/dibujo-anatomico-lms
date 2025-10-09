// auth.js - Sistema de Autenticación LMS Dibujo Anatómico
// Universidad Alberto Hurtado - Joselyn Vizcarra
// Versión 2.1 - Compatibilidad total con Apps Script JSONP

// ========================
// CONFIGURACIÓN GLOBAL
// ========================

const API_URL = 'https://script.google.com/macros/s/AKfycbygraW83QphICTmm9KdASa7Qax2TXABGmqLkYx5zruenWG45WeBGGFn8MnwXIscwrK4/exec';
const TOTAL_MODULES = 3;
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 horas

let authInitialized = false;

// ========================
// AUTENTICACIÓN
// ========================

async function authenticateUser(username, password) {
    try {
        showLoading(true, 'Verificando credenciales...');

        const result = await makeJSONPRequest('login', { username, password });

        if (result.success) {
            const userData = result.data;

            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('sessionStart', userData.loginTime || new Date().toISOString());

            await logUserActivity('login', userData, { timestamp: new Date().toISOString() });

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

// ========================
// JSONP REQUEST
// ========================

function makeJSONPRequest(action, params = {}) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonpCallback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        window[callbackName] = function (data) {
            delete window[callbackName];
            if (document.head.contains(script)) document.head.removeChild(script);
            resolve(data);
        };

        const queryParams = new URLSearchParams({ action, callback: callbackName, ...params });
        const url = `${API_URL}?${queryParams.toString()}`;

        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onerror = () => {
            delete window[callbackName];
            if (document.head.contains(script)) document.head.removeChild(script);
            reject(new Error('Error de red al conectar con Google Sheets'));
        };

        const timeout = setTimeout(() => {
            if (window[callbackName]) {
                delete window[callbackName];
                if (document.head.contains(script)) document.head.removeChild(script);
                reject(new Error('Timeout: La solicitud tardó demasiado (15s)'));
            }
        }, 15000);

        const originalCallback = window[callbackName];
        window[callbackName] = function (data) {
            clearTimeout(timeout);
            originalCallback(data);
        };

        document.head.appendChild(script);
    });
}

// ========================
// SESIÓN Y ROLES
// ========================

function isAuthenticated() {
    const authFlag = localStorage.getItem('isAuthenticated') === 'true';
    const userStr = localStorage.getItem('currentUser');
    const sessionStart = localStorage.getItem('sessionStart');

    if (!authFlag || !userStr || userStr === 'null') return false;

    if (sessionStart) {
        const sessionAge = Date.now() - new Date(sessionStart).getTime();
        if (sessionAge > SESSION_TIMEOUT) {
            console.warn('Sesión expirada');
            logout();
            return false;
        }
    }

    try {
        const user = JSON.parse(userStr);
        return !!(user && user.username && user.role);
    } catch (error) {
        console.error('Error validando usuario:', error);
        return false;
    }
}

function getCurrentUser() {
    if (!isAuthenticated()) return null;
    try {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return user;
    } catch (error) {
        logout();
        return null;
    }
}

async function logout() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        try {
            await logUserActivity('logout', currentUser, { timestamp: new Date().toISOString() });
        } catch (e) {}
    }
    localStorage.clear();
    window.location.href = 'login.html';
}

function protectPage(requiredRole = null) {
    const currentUser = getCurrentUser();

    if (!isAuthenticated() || !currentUser) {
        window.location.href = 'login.html';
        return false;
    }

    if (!requiredRole) return true;

    if (currentUser.role !== requiredRole) {
        if (currentUser.role === 'instructor') {
            window.location.href = 'dashboard.html';
        } else {
            window.location.href = 'index.html';
        }
        return false;
    }

    return true;
}

// ========================
// SISTEMA DE PROGRESO
// ========================

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

async function getStudentProgress(username = null) {
    try {
        const userToQuery = username || getCurrentUser()?.username;
        if (!userToQuery) return null;

        const result = await makeJSONPRequest('getProgress', { username: userToQuery });
        if (result.success && result.data) return result.data;

        return initializeEmptyProgress();
    } catch {
        return initializeEmptyProgress();
    }
}

// ✅ CORREGIDO: compatibilidad total con Apps Script v2.1
async function updateModuleProgress(moduleNumber, progressData) {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) return false;

        // permitir estudiante o evaluador
        if (!['estudiante', 'evaluador'].includes(currentUser.role)) {
            console.warn(`Rol sin permisos para guardar progreso: ${currentUser.role}`);
            return false;
        }

        if (moduleNumber < 1 || moduleNumber > TOTAL_MODULES) return false;

        let currentProgress = await getStudentProgress();
        if (!currentProgress) currentProgress = initializeEmptyProgress();

        currentProgress.modules[moduleNumber] = {
            ...currentProgress.modules[moduleNumber],
            ...progressData,
            lastUpdate: new Date().toISOString()
        };

        const completedModules = Object.values(currentProgress.modules).filter(m => m.completed).length;
        currentProgress.overallProgress = Math.round((completedModules / TOTAL_MODULES) * 100);
        currentProgress.lastAccess = new Date().toISOString();
        currentProgress.totalTime = Object.values(currentProgress.modules).reduce((t, m) => t + (m.timeSpent || 0), 0);

        // enviar parámetros individuales (versión JSONP optimizada)
        const mod = currentProgress.modules[moduleNumber];
        const result = await makeJSONPRequest('saveProgress', {
            username: currentUser.username,
            module: moduleNumber,
            completed: mod.completed ? 1 : 0,
            progress: mod.progress || 0,
            timeSpent: mod.timeSpent || 0,
            lessons: (mod.completedLessons || []).join(','),
            timestamp: Date.now()
        });

        if (result.success) {
            console.log(`✅ Progreso módulo ${moduleNumber} guardado en Sheets`);
            await logUserActivity('progress_update', currentUser, {
                moduleId: moduleNumber,
                progress: progressData.progress,
                completed: progressData.completed
            });
            return true;
        } else {
            console.error('❌ Error guardando progreso:', result.error);
            return false;
        }
    } catch (error) {
        console.error('Error updateModuleProgress:', error);
        return false;
    }
}

// ========================
// LOG DE ACTIVIDADES
// ========================

async function logUserActivity(activityType, userData, details = {}) {
    try {
        if (!userData || !userData.username) return false;

        const activity = {
            action: 'logActivity',
            userId: userData.id || 0,
            username: userData.username,
            activityType,
            moduleId: details.moduleId || '',
            lessonId: details.lessonId || '',
            details: JSON.stringify(details),
            sessionId: userData.sessionId || generateSessionId(),
            timestamp: new Date().toISOString()
        };

        const result = await makeJSONPRequest('logActivity', activity);
        if (result.success) {
            console.log(`📝 Actividad registrada: ${activityType}`);
            return true;
        } else {
            console.warn('⚠️ No se registró actividad:', result.error);
            return false;
        }
    } catch (e) {
        console.error('Error registrando actividad:', e);
        return false;
    }
}

// ========================
// UTILIDADES UI
// ========================

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function showLoading(show, message = 'Cargando...') {
    let loader = document.getElementById('globalLoader');
    if (show) {
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'globalLoader';
            loader.innerHTML = `
                <div style="position:fixed;top:0;left:0;width:100%;height:100%;
                            background:rgba(0,0,0,0.5);z-index:9999;
                            display:flex;align-items:center;justify-content:center;">
                    <div style="background:white;padding:2rem;border-radius:10px;
                                text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.2);">
                        <div class="spinner-border text-primary mb-3" role="status"></div>
                        <p>${message}</p>
                    </div>
                </div>`;
            document.body.appendChild(loader);
        }
    } else if (loader) {
        loader.remove();
    }
}

function getRoleDisplayName(role) {
    const names = { instructor: 'Instructor', estudiante: 'Estudiante', evaluador: 'Evaluador' };
    return names[role] || 'Usuario';
}

function updateUIForRole() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    document.querySelectorAll('.user-name').forEach(e => e.textContent = currentUser.fullName || currentUser.username);
    document.querySelectorAll('.user-email').forEach(e => e.textContent = currentUser.email || '');
    const roleEl = document.getElementById('userRole');
    if (roleEl) roleEl.textContent = getRoleDisplayName(currentUser.role);
}

console.log('✅ auth.js v2.1 cargado correctamente'); 
// ========================
// 🔍 TEST DE CONEXIÓN
// ========================
async function testGoogleSheetsConnection() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Debes iniciar sesión primero.');
        return;
    }

    showLoading(true, 'Verificando conexión con Google Sheets...');

    try {
        const result = await makeJSONPRequest('saveProgress', {
            username: currentUser.username,
            module: 1,
            completed: 0,
            progress: 10,
            timeSpent: 2,
            lessons: '1',
            timestamp: Date.now()
        });

        showLoading(false);
        console.log('Resultado de test:', result);

        if (result.success) {
            alert('✅ Conexión exitosa: los datos se guardaron correctamente.');
        } else {
            alert('⚠️ Falló el guardado: ' + (result.error || 'Error desconocido'));
        }
    } catch (err) {
        showLoading(false);
        alert('❌ Error de red o CORS: ' + err.message);
    }
}
