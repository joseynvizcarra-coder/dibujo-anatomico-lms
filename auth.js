// =====================================================
// auth.js v3.1 - LMS Dibujo Anatómico (UAH)
// Universidad Alberto Hurtado - Joselyn Vizcarra
// SISTEMA CORREGIDO - Octubre 2025
// =====================================================

const API_URL = 'https://script.google.com/macros/s/AKfycbxwh_2REV51UCEBEYHFAomVkAakCLwYpQ4koz2v-3negIzZCf6ILYtGgTd5A3Bffa8i/exec';
const TOTAL_MODULES = 3;
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 horas

// =========================
// CONFIGURACIÓN UNIFICADA
// =========================

const STORAGE_KEYS = {
  user: 'currentUser',
  authenticated: 'isAuthenticated',
  sessionStart: 'sessionStart',
  progress: (username) => `progress_${username}`
};

console.log('✅ auth.js v3.1 cargado correctamente');

// =========================
// AUTENTICACIÓN
// =========================

async function authenticateUser(username, password) {
  try {
    showLoading(true, 'Verificando credenciales...');
    
    // ✅ CORREGIDO: Cambiado de 'authenticate' a 'login'
    const result = await makeJSONPRequest('login', { username, password });

    if (result.success) {
      const userData = result.data;
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.authenticated, 'true');
      localStorage.setItem(STORAGE_KEYS.sessionStart, userData.loginTime || new Date().toISOString());

      await logUserActivity('login', userData, { timestamp: new Date().toISOString() });

      showLoading(false);
      return { success: true, user: userData };
    } else {
      showLoading(false);
      return { success: false, error: result.error || 'Credenciales incorrectas' };
    }
  } catch (err) {
    showLoading(false);
    console.error('❌ Error autenticando usuario:', err);
    return { success: false, error: 'Error de conexión con Google Sheets.' };
  }
}

function logout() {
  const user = getCurrentUser();
  if (user) {
    logUserActivity('logout', user);
  }
  localStorage.clear();
  window.location.href = 'login.html';
}

function isAuthenticated() {
  const auth = localStorage.getItem(STORAGE_KEYS.authenticated);
  const sessionStart = localStorage.getItem(STORAGE_KEYS.sessionStart);
  
  if (auth !== 'true' || !sessionStart) return false;
  
  const elapsed = Date.now() - new Date(sessionStart).getTime();
  if (elapsed > SESSION_TIMEOUT) {
    logout();
    return false;
  }
  
  return true;
}

function getCurrentUser() {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.user);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('❌ Error obteniendo usuario:', error);
    return null;
  }
}

function protectPage(requiredRole = null) {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return false;
  }
  
  const user = getCurrentUser();
  if (requiredRole && user.role !== requiredRole) {
    alert('No tienes permisos para acceder a esta página.');
    window.location.href = 'index.html';
    return false;
  }
  
  return true;
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
    console.log('📡 JSONP Request →', action, params);

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onerror = () => {
      delete window[callbackName];
      reject(new Error('Error de conexión con el servidor'));
    };

    document.head.appendChild(script);
  });
}

// =========================
// GESTIÓN DE PROGRESO
// =========================

async function getStudentProgress() {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const progressKey = STORAGE_KEYS.progress(currentUser.username);
  const localProgress = localStorage.getItem(progressKey);

  if (localProgress) {
    try {
      return JSON.parse(localProgress);
    } catch (error) {
      console.error('❌ Error parseando progreso local:', error);
    }
  }

  // ✅ CORREGIDO: Obtener progreso desde Google Sheets
  try {
    const result = await makeJSONPRequest('getProgress', { username: currentUser.username });
    if (result.success && result.data) {
      localStorage.setItem(progressKey, JSON.stringify(result.data));
      return result.data;
    }
  } catch (error) {
    console.error('❌ Error obteniendo progreso:', error);
  }

  return initializeEmptyProgress();
}

function initializeEmptyProgress() {
  return {
    modules: {
      1: { completed: false, progress: 0, timeSpent: 0, completedLessons: [], lastUpdate: null },
      2: { completed: false, progress: 0, timeSpent: 0, completedLessons: [], lastUpdate: null },
      3: { completed: false, progress: 0, timeSpent: 0, completedLessons: [], lastUpdate: null }
    },
    overallProgress: 0,
    totalTimeSpent: 0,
    lastActivity: new Date().toISOString()
  };
}

// ✅ CORREGIDO: Actualizar progreso
async function updateModuleProgress(moduleNumber, progressData) {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      console.warn('❌ No hay usuario autenticado');
      return false;
    }

    if (!['estudiante', 'evaluador'].includes(currentUser.role)) {
      console.warn(`⚠️ Rol sin permisos para guardar: ${currentUser.role}`);
      return false;
    }

    if (moduleNumber < 1 || moduleNumber > TOTAL_MODULES) {
      console.error(`❌ Número de módulo inválido: ${moduleNumber}`);
      return false;
    }

    let currentProgress = await getStudentProgress();
    if (!currentProgress) currentProgress = initializeEmptyProgress();

    currentProgress.modules[moduleNumber] = {
      ...currentProgress.modules[moduleNumber],
      ...progressData,
      lastUpdate: new Date().toISOString()
    };

    const completedModules = Object.values(currentProgress.modules).filter(m => m.completed).length;
    currentProgress.overallProgress = Math.round((completedModules / TOTAL_MODULES) * 100);
    currentProgress.totalTimeSpent = Object.values(currentProgress.modules).reduce((sum, m) => sum + (m.timeSpent || 0), 0);
    currentProgress.lastActivity = new Date().toISOString();

    const progressKey = STORAGE_KEYS.progress(currentUser.username);
    localStorage.setItem(progressKey, JSON.stringify(currentProgress));

    // ✅ CORREGIDO: Llamar a 'saveProgress' con la estructura completa
    const result = await makeJSONPRequest('saveProgress', {
      username: currentUser.username,
      progressData: JSON.stringify(currentProgress) // Enviar todo el objeto
    });

    if (result.success) {
      console.log(`✅ Progreso módulo ${moduleNumber} guardado en Sheets`);
      
      await logUserActivity('progress_update', currentUser, {
        moduleId: moduleNumber,
        progress: currentProgress.modules[moduleNumber].progress,
        completed: currentProgress.modules[moduleNumber].completed
      });
      
      return true;
    } else {
      console.error('❌ Error guardando en Sheets:', result.error);
      return false;
    }
  } catch (err) {
    console.error('❌ Error en updateModuleProgress:', err);
    return false;
  }
}

// ✅ CORREGIDO: Registrar actividad
async function logUserActivity(activityType, userData, details = {}) {
  try {
    if (!userData || !userData.username) {
      console.warn('⚠️ No se puede registrar actividad sin usuario');
      return false;
    }

    const params = {
      userId: userData.id || '',
      username: userData.username,
      action: activityType,
      moduleId: details.moduleId || '',
      lessonId: details.lessonId || '',
      details: JSON.stringify(details),
      sessionId: userData.sessionId || ''
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
    console.error('❌ Error registrando actividad:', err);
    return false;
  }
}

// =========================
// UTILIDADES UI
// =========================

function showLoading(show, message = 'Cargando...') {
  let loader = document.getElementById('globalLoader');
  
  if (show) {
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'globalLoader';
      loader.innerHTML = `
        <div style="position:fixed;top:0;left:0;width:100%;height:100%;
                    background:rgba(0,0,0,0.6);z-index:9999;display:flex;
                    align-items:center;justify-content:center;backdrop-filter:blur(3px);">
          <div style="background:white;padding:2rem;border-radius:12px;text-align:center;
                      box-shadow:0 10px 40px rgba(0,0,0,0.3);">
            <div class="spinner-border text-primary mb-3" role="status"></div>
            <p style="margin:0;color:#333;font-weight:500;">${message}</p>
          </div>
        </div>`;
      document.body.appendChild(loader);
    }
  } else {
    if (loader) loader.remove();
  }
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  const bgColor = {
    success: '#4CAF50',
    error: '#f44336',
    warning: '#FFC107',
    info: '#2196F3'
  }[type] || '#2196F3';

  toast.innerHTML = `
    <div style="position:fixed;top:20px;right:20px;background:${bgColor};color:white;
                padding:1rem 1.5rem;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);
                z-index:10000;animation:slideIn 0.3s ease;font-weight:500;">
      ${message}
    </div>`;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function getRoleDisplayName(role) {
  const roles = { 
    instructor: 'Instructor', 
    estudiante: 'Estudiante', 
    evaluador: 'Evaluador' 
  };
  return roles[role] || 'Usuario';
}

function updateUIForRole() {
  const user = getCurrentUser();
  if (!user) return;

  document.querySelectorAll('.user-name').forEach(el => {
    el.textContent = user.fullName || user.username;
  });
  
  document.querySelectorAll('.user-email').forEach(el => {
    el.textContent = user.email || '';
  });
  
  const roleEl = document.getElementById('userRole');
  if (roleEl) roleEl.textContent = getRoleDisplayName(user.role);
}

// =========================
// FUNCIONES DE TESTING
// =========================

async function testGoogleSheetsConnection() {
  const user = getCurrentUser();
  if (!user) {
    alert('⚠️ Inicia sesión primero para hacer el test.');
    return;
  }

  console.log('🧪 TEST DE CONEXIÓN A GOOGLE SHEETS');
  showLoading(true, 'Probando conexión con Google Sheets...');

  try {
    console.log('Test 1: login...');
    const result1 = await makeJSONPRequest('login', {
      username: user.username,
      password: 'test'
    });
    console.log('Resultado Test 1:', result1);

    console.log('Test 2: getProgress...');
    const result2 = await makeJSONPRequest('getProgress', {
      username: user.username
    });
    console.log('Resultado Test 2:', result2);

    console.log('Test 3: logActivity...');
    const result3 = await makeJSONPRequest('logActivity', {
      userId: user.id || '',
      username: user.username,
      action: 'test',
      moduleId: '1',
      lessonId: '1',
      details: JSON.stringify({ test: true }),
      sessionId: user.sessionId || ''
    });
    console.log('Resultado Test 3:', result3);

    showLoading(false);

    if (result2.success && result3.success) {
      alert('✅ CONEXIÓN EXITOSA\n\n' +
            '✔ getProgress funciona\n' +
            '✔ logActivity funciona\n\n' +
            'Revisa la consola para más detalles.');
      showToast('Conexión exitosa con Google Sheets', 'success');
    } else {
      alert('⚠️ CONEXIÓN PARCIAL\n\n' +
            (result2.success ? '✔' : '✗') + ' getProgress\n' +
            (result3.success ? '✔' : '✗') + ' logActivity\n\n' +
            'Revisa la consola para más detalles.');
      showToast('Algunos endpoints fallaron', 'warning');
    }

  } catch (err) {
    showLoading(false);
    console.error('❌ Error en test:', err);
    alert('❌ ERROR DE CONEXIÓN\n\n' + err.message);
    showToast('Error de conexión', 'error');
  }
}

window.testGoogleSheetsConnection = testGoogleSheetsConnection;

// =========================
// ANIMACIONES CSS
// =========================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

console.log('✅ auth.js v3.1 inicializado completamente');
console.log('🧪 Para probar conexión: testGoogleSheetsConnection()');
