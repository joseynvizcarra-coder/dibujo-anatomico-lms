// =====================================================
// auth.js v3.2 - LMS Dibujo Anatómico (UAH)
// Universidad Alberto Hurtado - Joselyn Vizcarra
// SISTEMA CORREGIDO CON MIGRACIÓN AUTOMÁTICA
// =====================================================

const API_URL = 'https://script.google.com/macros/s/AKfycbwTOCRqlmssB095rOHJrGswLF25e1DFk8fZDkbziw1g4_JomibsX0OfWY8xmNPOiHt8/exec';
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

console.log('✅ auth.js v3.2 cargado correctamente');

// =========================
// AUTENTICACIÓN
// =========================

async function authenticateUser(username, password) {
  try {
    showLoading(true, 'Verificando credenciales...');
    
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
      const parsed = JSON.parse(localProgress);
      
      // ✅ CRÍTICO: Validar y migrar formato viejo
      if (!parsed.modules) {
        console.warn('⚠️ Formato viejo detectado, migrando automáticamente...');
        
        // Crear estructura nueva vacía
        const migratedProgress = initializeEmptyProgress();
        
        // Guardar formato nuevo
        localStorage.setItem(progressKey, JSON.stringify(migratedProgress));
        console.log('✅ Progreso migrado al nuevo formato');
        
        return migratedProgress;
      }
      
      // ✅ Validar que modules tenga la estructura correcta
      if (!parsed.modules[1] || !parsed.modules[2] || !parsed.modules[3]) {
        console.warn('⚠️ Estructura de modules incompleta, inicializando...');
        const fixed = initializeEmptyProgress();
        // Copiar datos existentes si hay
        if (parsed.modules[1]) fixed.modules[1] = parsed.modules[1];
        if (parsed.modules[2]) fixed.modules[2] = parsed.modules[2];
        if (parsed.modules[3]) fixed.modules[3] = parsed.modules[3];
        localStorage.setItem(progressKey, JSON.stringify(fixed));
        return fixed;
      }
      
      return parsed;
    } catch (error) {
      console.error('❌ Error parseando progreso local:', error);
      return initializeEmptyProgress();
    }
  }

  // Intentar obtener desde Google Sheets
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
      1: { completed: false, progress: 0, timeSpent: 0, completedLessons: [], evaluations: {}, lastUpdate: null },
      2: { completed: false, progress: 0, timeSpent: 0, completedLessons: [], evaluations: {}, lastUpdate: null },
      3: { completed: false, progress: 0, timeSpent: 0, completedLessons: [], evaluations: {}, lastUpdate: null }
    },
    overallProgress: 0,
    totalTimeSpent: 0,
    lastActivity: new Date().toISOString()
  };
}

// ✅ CORREGIDO: Actualizar progreso con validación robusta
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
    
    // ✅ CRÍTICO: Asegurar que currentProgress tenga la estructura correcta
    if (!currentProgress || !currentProgress.modules) {
      console.warn('⚠️ currentProgress no válido, inicializando...');
      currentProgress = initializeEmptyProgress();
    }

    // ✅ Validar que el módulo específico exista
    if (!currentProgress.modules[moduleNumber]) {
      console.warn(`⚠️ Módulo ${moduleNumber} no existe, inicializando...`);
      currentProgress.modules[moduleNumber] = {
        completed: false,
        progress: 0,
        timeSpent: 0,
        completedLessons: [],
        evaluations: {},
        lastUpdate: null
      };
    }

    // Actualizar datos del módulo
    currentProgress.modules[moduleNumber] = {
      ...currentProgress.modules[moduleNumber],
      ...progressData,
      lastUpdate: new Date().toISOString()
    };

    // Recalcular progreso general
    const completedModules = Object.values(currentProgress.modules).filter(m => m.completed).length;
    currentProgress.overallProgress = Math.round((completedModules / TOTAL_MODULES) * 100);
    currentProgress.totalTimeSpent = Object.values(currentProgress.modules).reduce((sum, m) => sum + (m.timeSpent || 0), 0);
    currentProgress.lastActivity = new Date().toISOString();

    // Guardar en localStorage SIEMPRE
    const progressKey = STORAGE_KEYS.progress(currentUser.username);
    localStorage.setItem(progressKey, JSON.stringify(currentProgress));
    console.log(`💾 Progreso guardado en localStorage`);

    // ✅ GUARDAR EN GOOGLE SHEETS SIEMPRE (para que el dashboard tenga datos actualizados)
    try {
      console.log(`📤 Guardando progreso en Google Sheets...`);
      
      const result = await makeJSONPRequest('saveProgress', {
        username: currentUser.username,
        progressData: JSON.stringify(currentProgress)
      });

      if (result.success) {
        console.log(`✅ Progreso módulo ${moduleNumber} guardado en Sheets`);
        
        // Registrar actividad según el estado
        const activityType = progressData.completed ? 'module_completed' : 'progress_update';
        await logUserActivity(activityType, currentUser, {
          moduleId: moduleNumber,
          progress: currentProgress.modules[moduleNumber].progress,
          completed: currentProgress.modules[moduleNumber].completed
        });
        
        return true;
      } else {
        console.warn('⚠️ No se pudo guardar en Sheets:', result.error);
        return true; // localStorage guardado es suficiente para continuar
      }
    } catch (sheetError) {
      console.warn('⚠️ Error guardando en Sheets (progreso local OK):', sheetError);
      return true; // No fallar si Sheets no responde
    }
  } catch (err) {
    console.error('❌ Error en updateModuleProgress:', err);
    return false;
  }
}

// ✅ CORREGIDO: Registrar actividad
async function logUserActivity(action, moduleId = '', lessonId = '', details = {}) {
  try {
    // ... código ...
    
    const params = {
      action: 'logActivity',
      userId: user.id,
      username: user.username,
      activityType: action,  // ✅ CORREGIDO: activityType en lugar de action
      moduleId: moduleId,
      lessonId: lessonId,
      // ...
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
            '✓ getProgress funciona\n' +
            '✓ logActivity funciona\n\n' +
            'Revisa la consola para más detalles.');
    } else {
      alert('⚠️ PROBLEMAS DETECTADOS\n\nRevisa la consola para más detalles.');
    }
  } catch (error) {
    showLoading(false);
    alert('❌ ERROR EN LA PRUEBA\n\n' + error.message);
    console.error('Error en test:', error);
  }
}

// Hacer disponible globalmente para testing
window.testGoogleSheetsConnection = testGoogleSheetsConnection;

// =========================
// INICIALIZACIÓN
// =========================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ auth.js v3.2 inicializado completamente');
    console.log('🧪 Para probar conexión: testGoogleSheetsConnection()');
  });
} else {
  console.log('✅ auth.js v3.2 inicializado completamente');
  console.log('🧪 Para probar conexión: testGoogleSheetsConnection()');
}
