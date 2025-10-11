// =====================================================
// auth.js - LMS Dibujo Anatómico (UAH)
// Universidad Alberto Hurtado - Joselyn Vizcarra
// Versión 2.2 - Compatible con Apps Script JSONP v2.1
// =====================================================

const API_URL = 'https://script.google.com/macros/s/AKfycbygraW83QphICTmm9KdASa7Qax2TXABGmqLkYx5zruenWG45WeBGGFn8MnwXIscwrK4/exec';
const TOTAL_MODULES = 3;
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 horas

// =========================
// AUTENTICACIÓN
// =========================

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
  } catch (err) {
    showLoading(false);
    console.error('Error autenticando usuario:', err);
    return { success: false, error: 'Error de conexión con Google Sheets.' };
  }
}

// =========================
// JSONP REQUEST
// =========================

function makeJSONPRequest(action, params = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = 'jsonp_cb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    window[callbackName] = function (data) {
      delete window[callbackName];
      if (document.head.contains(script)) document.head.removeChild(script);
      resolve(data);
    };

    const queryParams = new URLSearchParams({ action, callback: callbackName, ...params });
    const url = `${API_URL}?${queryParams.toString()}`;
    console.log('📡 JSONP Request →', url); // útil para depurar

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onerror = () => reject(new Error('Error de conexión con el servidor'));

    document.head.appendChild(script);
  });
}

// =========================
// SESIÓN Y USUARIO
// =========================

function isAuthenticated() {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const user = localStorage.getItem('currentUser');
  const sessionStart = localStorage.getItem('sessionStart');

  if (!isAuth || !user) return false;
  if (sessionStart) {
    const diff = Date.now() - new Date(sessionStart).getTime();
    if (diff > SESSION_TIMEOUT) {
      console.warn('Sesión expirada');
      logout();
      return false;
    }
  }
  return true;
}

function getCurrentUser() {
  try {
    if (!isAuthenticated()) return null;
    return JSON.parse(localStorage.getItem('currentUser'));
  } catch {
    logout();
    return null;
  }
}

async function logout() {
  const user = getCurrentUser();
  if (user) await logUserActivity('logout', user);
  localStorage.clear();
  window.location.href = 'login.html';
}

function protectPage(requiredRole = null) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return false;
  }

  if (requiredRole && user.role !== requiredRole) {
    if (user.role === 'instructor') window.location.href = 'dashboard.html';
    else window.location.href = 'index.html';
    return false;
  }

  return true;
}

// =========================
// PROGRESO Y MÓDULOS
// =========================

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
  const currentUser = getCurrentUser();
  const userToQuery = username || currentUser?.username;
  if (!userToQuery) return initializeEmptyProgress();

  const result = await makeJSONPRequest('getProgress', { username: userToQuery });
  return (result.success && result.data) ? result.data : initializeEmptyProgress();
}

// ✅ Guarda progreso correctamente
async function updateModuleProgress(moduleNumber, progressData) {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;

    // Permitir estudiante y evaluador
    if (!['estudiante', 'evaluador'].includes(currentUser.role)) {
      console.warn(`Rol sin permisos para guardar: ${currentUser.role}`);
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
    currentProgress.totalTime = Object.values(currentProgress.modules).reduce((sum, m) => sum + (m.timeSpent || 0), 0);
    currentProgress.lastAccess = new Date().toISOString();

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
      console.log(`✅ Progreso módulo ${moduleNumber} guardado.`);
      await logUserActivity('progress_update', currentUser, {
        moduleId: moduleNumber,
        progress: mod.progress,
        completed: mod.completed
      });
      return true;
    } else {
      console.error('❌ Error guardando progreso:', result.error);
      return false;
    }
  } catch (err) {
    console.error('Error en updateModuleProgress:', err);
    return false;
  }
}

// =========================
// LOG DE ACTIVIDADES
// =========================

async function logUserActivity(activityType, userData, details = {}) {
  try {
    if (!userData || !userData.username) return false;

    const params = {
      action: 'logActivity',
      userId: userData.id || 0,
      username: userData.username,
      activityType,
      moduleId: details.moduleId || '',
      lessonId: details.lessonId || '',
      details: JSON.stringify(details),
      sessionId: userData.sessionId || generateSessionId()
    };

    const result = await makeJSONPRequest('logActivity', params);

    if (result.success) {
      console.log(`📝 Actividad registrada: ${activityType}`);
      return true;
    } else {
      console.warn('⚠️ No se registró actividad:', result.error);
      return false;
    }
  } catch (err) {
    console.error('Error registrando actividad:', err);
    return false;
  }
}

// =========================
// UTILIDADES
// =========================

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
                    background:rgba(0,0,0,0.4);z-index:9999;display:flex;
                    align-items:center;justify-content:center;">
          <div style="background:white;padding:2rem;border-radius:10px;text-align:center;">
            <div class="spinner-border text-primary mb-3"></div>
            <p>${message}</p>
          </div>
        </div>`;
      document.body.appendChild(loader);
    }
  } else if (loader) loader.remove();
}

function getRoleDisplayName(role) {
  const roles = { instructor: 'Instructor', estudiante: 'Estudiante', evaluador: 'Evaluador' };
  return roles[role] || 'Usuario';
}

function updateUIForRole() {
  const u = getCurrentUser();
  if (!u) return;
  document.querySelectorAll('.user-name').forEach(e => e.textContent = u.fullName || u.username);
  document.querySelectorAll('.user-email').forEach(e => e.textContent = u.email || '');
  const roleEl = document.getElementById('userRole');
  if (roleEl) roleEl.textContent = getRoleDisplayName(u.role);
}

// =========================
// 🔍 TEST DE CONEXIÓN
// =========================

async function testGoogleSheetsConnection() {
  const user = getCurrentUser();
  if (!user) return alert('Inicia sesión primero.');

  showLoading(true, 'Verificando conexión con Google Sheets...');
  try {
    const result = await makeJSONPRequest('saveProgress', {
      username: user.username,
      module: 1,
      completed: 0,
      progress: 5,
      timeSpent: 1,
      lessons: '1',
      timestamp: Date.now()
    });

    showLoading(false);
    console.log('Resultado test conexión:', result);
    if (result.success) alert('✅ Conexión exitosa con Google Sheets.');
    else alert('⚠️ Error: ' + result.error);
  } catch (err) {
    showLoading(false);
    alert('❌ Error de conexión: ' + err.message);
  }
}

console.log('✅ auth.js v2.2 cargado correctamente');
