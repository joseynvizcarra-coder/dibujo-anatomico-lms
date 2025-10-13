// =====================================================
// auth.js v3.0 - LMS Dibujo Anatómico (UAH)
// Universidad Alberto Hurtado - Joselyn Vizcarra
// SISTEMA UNIFICADO - Compatible con Google Apps Script
// =====================================================

const API_URL = 'https://script.google.com/macros/s/AKfycbygraW83QphICTmm9KdASa7Qax2TXABGmqLkYx5zruenWG45WeBGGFn8MnwXIscwrK4/exec';
const TOTAL_MODULES = 3;
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 horas

// =========================
// 🔑 SISTEMA DE KEYS UNIFICADO
// =========================
// CRITICAL: Todos los módulos usan el mismo formato
function getProgressKey(username) {
  return `progress_${username}`;
}

// =========================
// AUTENTICACIÓN
// =========================

async function authenticateUser(username, password) {
  try {
    showLoading(true, 'Verificando credenciales...');
    
    // Llamada a Google Apps Script
    const result = await makeJSONPRequest('authenticate', { 
      username, 
      password 
    });

    if (result.success) {
      const userData = result.user;
      
      // Guardar sesión
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('sessionStart', new Date().toISOString());

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
  } catch (err) {
    showLoading(false);
    console.error('❌ Error autenticando:', err);
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
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      resolve(data);
    };

    const queryParams = new URLSearchParams({ 
      action, 
      callback: callbackName, 
      ...params 
    });
    
    const url = `${API_URL}?${queryParams.toString()}`;
    console.log('📡 JSONP Request →', action, params);

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onerror = () => reject(new Error('Error de conexión con el servidor'));

    document.head.appendChild(script);
    
    // Timeout de 30 segundos
    setTimeout(() => {
      if (window[callbackName]) {
        delete window[callbackName];
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        reject(new Error('Timeout: El servidor no respondió'));
      }
    }, 30000);
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
  
  // Verificar timeout de sesión
  if (sessionStart) {
    const diff = Date.now() - new Date(sessionStart).getTime();
    if (diff > SESSION_TIMEOUT) {
      console.warn('⚠️ Sesión expirada');
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
  } catch (error) {
    console.error('❌ Error parseando usuario:', error);
    logout();
    return null;
  }
}

async function logout() {
  const user = getCurrentUser();
  if (user) {
    await logUserActivity('logout', user);
  }
  
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
    if (user.role === 'instructor') {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'index.html';
    }
    return false;
  }

  return true;
}

// =========================
// PROGRESO - SISTEMA UNIFICADO
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

// ✅ FUNCIÓN CORREGIDA: Lee progreso del localStorage usando KEY UNIFICADA
function getStudentProgressLocal() {
  const currentUser = getCurrentUser();
  if (!currentUser) return initializeEmptyProgress();
  
  const progressKey = getProgressKey(currentUser.username);
  
  try {
    const saved = localStorage.getItem(progressKey);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('❌ Error leyendo progreso local:', error);
  }
  
  return initializeEmptyProgress();
}

// ✅ FUNCIÓN CORREGIDA: Guarda progreso en localStorage usando KEY UNIFICADA
function saveStudentProgressLocal(progressData) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  
  const progressKey = getProgressKey(currentUser.username);
  
  try {
    localStorage.setItem(progressKey, JSON.stringify(progressData));
    console.log('✅ Progreso guardado en localStorage');
    return true;
  } catch (error) {
    console.error('❌ Error guardando en localStorage:', error);
    return false;
  }
}

// ✅ FUNCIÓN CORREGIDA: Sincroniza con Google Sheets
async function updateModuleProgress(moduleNumber, progressData) {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      console.warn('❌ No hay usuario autenticado');
      return false;
    }

    // Validar número de módulo
    if (moduleNumber < 1 || moduleNumber > TOTAL_MODULES) {
      console.error('❌ Número de módulo inválido:', moduleNumber);
      return false;
    }

    // 1. Actualizar progreso local
    let currentProgress = getStudentProgressLocal();
    if (!currentProgress) {
      currentProgress = initializeEmptyProgress();
    }

    // Actualizar datos del módulo específico
    currentProgress.modules[moduleNumber] = {
      ...currentProgress.modules[moduleNumber],
      ...progressData,
      lastUpdate: new Date().toISOString()
    };

    // Calcular progreso general
    const completedModules = Object.values(currentProgress.modules)
      .filter(m => m.completed).length;
    currentProgress.overallProgress = Math.round((completedModules / TOTAL_MODULES) * 100);
    
    // Calcular tiempo total
    currentProgress.totalTime = Object.values(currentProgress.modules)
      .reduce((sum, m) => sum + (m.timeSpent || 0), 0);
    
    currentProgress.lastAccess = new Date().toISOString();

    // Guardar localmente
    saveStudentProgressLocal(currentProgress);

    // 2. Sincronizar con Google Sheets
    const mod = currentProgress.modules[moduleNumber];
    
    const result = await makeJSONPRequest('updateProgress', {
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
      
      // Registrar actividad
      await logUserActivity('progress_update', currentUser, {
        moduleId: moduleNumber,
        progress: mod.progress,
        completed: mod.completed
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

// =========================
// LOG DE ACTIVIDADES
// =========================

// ✅ FUNCIÓN CORREGIDA: Registra actividades en Google Sheets
async function logUserActivity(activityType, userData, details = {}) {
  try {
    if (!userData || !userData.username) {
      console.warn('⚠️ No se puede registrar actividad sin usuario');
      return false;
    }

    const result = await makeJSONPRequest('logActivity', {
      username: userData.username,
      activityType: activityType,
      moduleId: details.moduleId || '',
      lessonId: details.lessonId || '',
      details: JSON.stringify(details),
      timestamp: Date.now()
    });

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
// UTILIDADES
// =========================

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
  } else {
    if (loader) loader.remove();
  }
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
  if (roleEl) {
    roleEl.textContent = getRoleDisplayName(user.role);
  }
}

// =========================
// 🧪 TEST DE CONEXIÓN
// =========================

async function testGoogleSheetsConnection() {
  const user = getCurrentUser();
  if (!user) {
    alert('❌ Inicia sesión primero.');
    return;
  }

  showLoading(true, 'Verificando conexión con Google Sheets...');
  
  try {
    // Test 1: Guardar progreso
    const result = await makeJSONPRequest('updateProgress', {
      username: user.username,
      module: 1,
      completed: 0,
      progress: 5,
      timeSpent: 1,
      lessons: '1',
      timestamp: Date.now()
    });

    showLoading(false);
    
    console.log('🧪 Resultado test conexión:', result);
    
    if (result.success) {
      alert('✅ CONEXIÓN EXITOSA\n\nGoogle Sheets está sincronizando correctamente.');
      return true;
    } else {
      alert('⚠️ CONEXIÓN CON ERRORES\n\n' + result.error);
      return false;
    }
  } catch (err) {
    showLoading(false);
    alert('❌ ERROR DE CONEXIÓN\n\n' + err.message);
    console.error('❌ Error test:', err);
    return false;
  }
}

// Hacer disponible globalmente para testing
window.testGoogleSheetsConnection = testGoogleSheetsConnection;

console.log('✅ auth.js v3.0 cargado correctamente - Sistema Unificado');
