// =====================================================
// auth.js v4.0 - LMS Dibujo Anatómico (UAH)
// Universidad Alberto Hurtado - Joselyn Vizcarra
// SISTEMA CON SINCRONIZACIÓN INTELIGENTE
// =====================================================

const API_URL = 'https://script.google.com/macros/s/AKfycbwTOCRqlmssB095rOHJrGswLF25e1DFk8fZDkbziw1g4_JomibsX0OfWY8xmNPOiHt8/exec';
const TOTAL_MODULES = 3;
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 horas
const SYNC_INTERVAL = 2 * 60 * 1000; // 2 minutos
const MAX_RETRIES = 3;

// =========================
// CONFIGURACIÓN UNIFICADA
// =========================

const STORAGE_KEYS = {
  user: 'currentUser',
  authenticated: 'isAuthenticated',
  sessionStart: 'sessionStart',
  progress: (username) => `progress_${username}`,
  lastSync: (username) => `lastSync_${username}`,
  syncStatus: 'syncStatus'
};

// Estado global de sincronización
let syncInterval = null;
let isSyncing = false;

console.log('✅ auth.js v4.0 cargado - Sistema de sincronización inteligente activo');

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

      // ✅ NUEVO: Sincronizar progreso inmediatamente después del login
      console.log('🔄 Sincronizando progreso desde Google Sheets...');
      await syncProgressFromSheets(username, true); // force=true

      // ✅ NUEVO: Iniciar sincronización automática en segundo plano
      startAutoSync();

      await logUserActivity('login', '', '', { timestamp: new Date().toISOString() });

      showLoading(false);
      updateSyncStatus('synced', 'Datos sincronizados');
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
    logUserActivity('logout', '', '');
  }
  
  // ✅ NUEVO: Detener sincronización automática
  stopAutoSync();
  
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
// SISTEMA DE SINCRONIZACIÓN
// =========================

// ✅ NUEVO: Iniciar sincronización automática en segundo plano
function startAutoSync() {
  const user = getCurrentUser();
  if (!user || user.role === 'instructor') {
    console.log('⏭️ Sincronización automática no necesaria para instructor');
    return;
  }
  
  if (syncInterval) {
    clearInterval(syncInterval);
  }
  
  console.log(`🔄 Sincronización automática iniciada (cada ${SYNC_INTERVAL / 60000} minutos)`);
  
  syncInterval = setInterval(async () => {
    if (!isSyncing) {
      console.log('🔄 Sincronización automática en progreso...');
      await syncProgressFromSheets(user.username, false);
    }
  }, SYNC_INTERVAL);
}

// ✅ NUEVO: Detener sincronización automática
function stopAutoSync() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
    console.log('⏹️ Sincronización automática detenida');
  }
}

// ✅ NUEVO: Sincronizar progreso desde Google Sheets
async function syncProgressFromSheets(username, force = false, retries = 0) {
  if (isSyncing && !force) {
    console.log('⏳ Sincronización ya en progreso, saltando...');
    return false;
  }
  
  isSyncing = true;
  updateSyncStatus('syncing', 'Sincronizando...');
  
  try {
    const result = await makeJSONPRequestWithRetry('getProgress', { username }, MAX_RETRIES);
    
    if (result.success && result.data) {
      const progressKey = STORAGE_KEYS.progress(username);
      const lastSyncKey = STORAGE_KEYS.lastSync(username);
      
      // Obtener progreso local actual
      const localProgress = localStorage.getItem(progressKey);
      let shouldUpdate = true;
      
      if (localProgress && !force) {
        try {
          const localData = JSON.parse(localProgress);
          const remoteData = result.data;
          
          // ✅ DETECCIÓN DE CONFLICTOS MEJORADA: Comparar progreso real, no solo timestamps
          const localTime = new Date(localData.lastActivity || 0).getTime();
          const remoteTime = new Date(remoteData.lastActivity || 0).getTime();
          
          // Calcular progreso real (módulos completados)
          const localCompleted = Object.values(localData.modules || {}).filter(m => m.completed).length;
          const remoteCompleted = Object.values(remoteData.modules || {}).filter(m => m.completed).length;
          
          // Contar lecciones completadas
          const localLessons = Object.values(localData.modules || {}).reduce((sum, m) => 
            sum + (Array.isArray(m.completedLessons) ? m.completedLessons.length : 0), 0);
          const remoteLessons = Object.values(remoteData.modules || {}).reduce((sum, m) => 
            sum + (Array.isArray(m.completedLessons) ? m.completedLessons.length : 0), 0);
          
          console.log(`🔍 Comparando progreso:
            Local: ${localCompleted} módulos, ${localLessons} lecciones, timestamp: ${localTime}
            Remoto: ${remoteCompleted} módulos, ${remoteLessons} lecciones, timestamp: ${remoteTime}`);
          
          // CRITERIO: Priorizar el que tenga MÁS progreso real
          if (localCompleted > remoteCompleted || (localCompleted === remoteCompleted && localLessons > remoteLessons)) {
            console.log('⚠️ Datos locales tienen más progreso, subiendo a Sheets...');
            await updateModuleProgress(null, localData, true);
            shouldUpdate = false;
          } else if (remoteCompleted > localCompleted || (remoteCompleted === localCompleted && remoteLessons > localLessons)) {
            console.log('📥 Datos de Sheets tienen más progreso, descargando...');
            shouldUpdate = true;
          } else if (localTime === remoteTime) {
            console.log('✅ Datos ya sincronizados (mismo progreso y timestamp)');
            shouldUpdate = false;
          } else if (localTime > remoteTime) {
            console.log('⚠️ Mismo progreso pero timestamp local más reciente, subiendo...');
            await updateModuleProgress(null, localData, true);
            shouldUpdate = false;
          } else {
            console.log('📥 Mismo progreso pero timestamp remoto más reciente, descargando...');
            shouldUpdate = true;
          }
        } catch (e) {
          console.warn('⚠️ Error comparando datos, usando Sheets por seguridad:', e);
          shouldUpdate = true;
        }
      }
      
      if (shouldUpdate) {
        // ✅ Validar que los datos remotos tengan contenido real
        const remoteCompleted = Object.values(result.data.modules || {}).filter(m => m.completed).length;
        const remoteLessons = Object.values(result.data.modules || {}).reduce((sum, m) => 
          sum + (Array.isArray(m.completedLessons) ? m.completedLessons.length : 0), 0);
        
        // Si los datos remotos están vacíos y hay datos locales, no sobrescribir
        if (remoteCompleted === 0 && remoteLessons === 0 && localProgress) {
          const localData = JSON.parse(localProgress);
          const localCompleted = Object.values(localData.modules || {}).filter(m => m.completed).length;
          const localLessons = Object.values(localData.modules || {}).reduce((sum, m) => 
            sum + (Array.isArray(m.completedLessons) ? m.completedLessons.length : 0), 0);
          
          if (localCompleted > 0 || localLessons > 0) {
            console.log('⚠️ Sheets tiene progreso vacío pero local tiene datos, conservando local');
            shouldUpdate = false;
          }
        }
        
        if (shouldUpdate) {
          // ✅ Validar y migrar si es necesario
          const validatedData = validateAndMigrateProgress(result.data);
          localStorage.setItem(progressKey, JSON.stringify(validatedData));
          console.log('✅ Progreso sincronizado desde Google Sheets');
        }
      }
      
      // Guardar timestamp de última sincronización
      localStorage.setItem(lastSyncKey, new Date().toISOString());
      
      updateSyncStatus('synced', 'Sincronizado hace instantes');
      isSyncing = false;
      return true;
      
    } else {
      throw new Error(result.error || 'No se pudo obtener progreso');
    }
    
  } catch (error) {
    console.error('❌ Error sincronizando progreso:', error);
    
    // ✅ RETRY con backoff exponencial
    if (retries < MAX_RETRIES) {
      const delay = Math.pow(2, retries) * 1000; // 1s, 2s, 4s
      console.log(`🔄 Reintentando en ${delay/1000}s... (intento ${retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      isSyncing = false;
      return syncProgressFromSheets(username, force, retries + 1);
    }
    
    updateSyncStatus('error', 'Error de sincronización');
    isSyncing = false;
    return false;
  }
}

// ✅ NUEVO: makeJSONPRequest con retry automático
async function makeJSONPRequestWithRetry(action, params = {}, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await makeJSONPRequest(action, params);
      return result;
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 500; // 500ms, 1s, 2s
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

// ✅ NUEVO: Actualizar indicador visual de sincronización
function updateSyncStatus(status, message) {
  localStorage.setItem(STORAGE_KEYS.syncStatus, JSON.stringify({ status, message, timestamp: new Date().toISOString() }));
  
  // Actualizar UI si existe el elemento
  const syncIndicator = document.getElementById('syncIndicator');
  if (syncIndicator) {
    const icons = {
      synced: '✅',
      syncing: '🔄',
      error: '⚠️',
      offline: '📴'
    };
    
    const colors = {
      synced: '#4CAF50',
      syncing: '#2196F3',
      error: '#f44336',
      offline: '#9E9E9E'
    };
    
    syncIndicator.innerHTML = `<span style="color: ${colors[status]}">${icons[status]} ${message}</span>`;
  }
  
  // Emitir evento personalizado para que otras partes de la app puedan reaccionar
  window.dispatchEvent(new CustomEvent('syncStatusChanged', { detail: { status, message } }));
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
      if (document.head.contains(script)) document.head.removeChild(script);
      reject(new Error('Error de conexión con el servidor'));
    };

    // Timeout de 30 segundos
    setTimeout(() => {
      if (window[callbackName]) {
        delete window[callbackName];
        if (document.head.contains(script)) document.head.removeChild(script);
        reject(new Error('Timeout: El servidor no respondió a tiempo'));
      }
    }, 30000);

    document.head.appendChild(script);
  });
}

// =========================
// GESTIÓN DE PROGRESO
// =========================

async function getStudentProgress(forceSync = false) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const progressKey = STORAGE_KEYS.progress(currentUser.username);
  
  // ✅ Si se fuerza sincronización, consultar Sheets primero
  if (forceSync) {
    console.log('🔄 Sincronización forzada solicitada...');
    await syncProgressFromSheets(currentUser.username, true);
  }
  
  const localProgress = localStorage.getItem(progressKey);

  if (localProgress) {
    try {
      const parsed = JSON.parse(localProgress);
      
      // ✅ Validar y migrar formato viejo
      return validateAndMigrateProgress(parsed);
      
    } catch (error) {
      console.error('❌ Error parseando progreso local:', error);
      // Si hay error, intentar sincronizar desde Sheets
      await syncProgressFromSheets(currentUser.username, true);
      const syncedProgress = localStorage.getItem(progressKey);
      if (syncedProgress) {
        try {
          return JSON.parse(syncedProgress);
        } catch (e) {
          return initializeEmptyProgress();
        }
      }
      return initializeEmptyProgress();
    }
  }

  // ✅ CRÍTICO: Si no hay localStorage, SIEMPRE consultar Sheets primero
  console.log('📥 No hay progreso local, consultando Google Sheets...');
  await syncProgressFromSheets(currentUser.username, true);
  
  // Intentar leer después de sincronizar
  const syncedProgress = localStorage.getItem(progressKey);
  if (syncedProgress) {
    try {
      const parsed = JSON.parse(syncedProgress);
      console.log('✅ Progreso cargado desde Sheets:', parsed.overallProgress + '%');
      return validateAndMigrateProgress(parsed);
    } catch (e) {
      console.error('❌ Error parseando progreso sincronizado:', e);
      return initializeEmptyProgress();
    }
  }

  // Si después de sincronizar no hay nada, el usuario realmente no tiene progreso
  console.log('ℹ️ Usuario sin progreso previo, inicializando...');
  return initializeEmptyProgress();
}

// ✅ NUEVO: Validar y migrar progreso
function validateAndMigrateProgress(progress) {
  // Crear estructura nueva si no tiene modules
  if (!progress.modules) {
    console.warn('⚠️ Formato viejo detectado, migrando automáticamente...');
    return initializeEmptyProgress();
  }
  
  // Validar que modules tenga la estructura correcta
  for (let i = 1; i <= TOTAL_MODULES; i++) {
    if (!progress.modules[i]) {
      console.warn(`⚠️ Módulo ${i} no existe, inicializando...`);
      progress.modules[i] = {
        completed: false,
        progress: 0,
        timeSpent: 0,
        completedLessons: [],
        evaluations: {},
        lastUpdate: null
      };
    }
    
    // ✅ CRÍTICO: Asegurar que completedLessons sea array
    if (typeof progress.modules[i].completedLessons === 'number') {
      progress.modules[i].completedLessons = [];
    }
    
    if (!Array.isArray(progress.modules[i].completedLessons)) {
      progress.modules[i].completedLessons = [];
    }
    
    // Asegurar que evaluations existe
    if (!progress.modules[i].evaluations) {
      progress.modules[i].evaluations = {};
    }
  }
  
  return progress;
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
    lastActivity: null // ✅ CRÍTICO: null en vez de timestamp actual para no sobrescribir
  };
}

// ✅ MEJORADO: Actualizar progreso con sincronización inteligente
async function updateModuleProgress(moduleNumber, progressData, skipSync = false) {
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

    // ✅ NUEVO: Sincronizar antes de guardar para evitar conflictos
    if (!skipSync) {
      console.log('🔄 Sincronizando antes de guardar...');
      await syncProgressFromSheets(currentUser.username, false);
    }

    let currentProgress = await getStudentProgress(false);
    
    // Validar estructura
    if (!currentProgress || !currentProgress.modules) {
      console.warn('⚠️ currentProgress no válido, inicializando...');
      currentProgress = initializeEmptyProgress();
    }

    // Si moduleNumber es null, actualizar todo el progreso (usado por syncProgressFromSheets)
    if (moduleNumber === null) {
      currentProgress = { ...currentProgress, ...progressData };
    } else {
      if (moduleNumber < 1 || moduleNumber > TOTAL_MODULES) {
        console.error(`❌ Número de módulo inválido: ${moduleNumber}`);
        return false;
      }

      // Validar que el módulo específico exista
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
    }

    // Recalcular progreso general
    const completedModules = Object.values(currentProgress.modules).filter(m => m.completed).length;
    currentProgress.overallProgress = Math.round((completedModules / TOTAL_MODULES) * 100);
    currentProgress.totalTimeSpent = Object.values(currentProgress.modules).reduce((sum, m) => sum + (m.timeSpent || 0), 0);
    currentProgress.lastActivity = new Date().toISOString();

    // Guardar en localStorage SIEMPRE
    const progressKey = STORAGE_KEYS.progress(currentUser.username);
    localStorage.setItem(progressKey, JSON.stringify(currentProgress));
    console.log(`💾 Progreso guardado en localStorage`);

    // ✅ GUARDAR EN GOOGLE SHEETS SIEMPRE
    if (!skipSync) {
      try {
        updateSyncStatus('syncing', 'Guardando en la nube...');
        console.log(`📤 Guardando progreso en Google Sheets...`);
        
        const result = await makeJSONPRequestWithRetry('saveProgress', {
          username: currentUser.username,
          progressData: JSON.stringify(currentProgress)
        }, MAX_RETRIES);

        if (result.success) {
          console.log(`✅ Progreso guardado en Sheets`);
          updateSyncStatus('synced', 'Guardado correctamente');
          
          // Registrar actividad según el estado
          if (moduleNumber !== null) {
            const activityType = progressData.completed ? 'module_completed' : 'progress_update';
            await logUserActivity(activityType, moduleNumber.toString(), '', {
              progress: currentProgress.modules[moduleNumber].progress,
              completed: currentProgress.modules[moduleNumber].completed
            });
          }
          
          return true;
        } else {
          console.warn('⚠️ No se pudo guardar en Sheets:', result.error);
          updateSyncStatus('error', 'Error guardando');
          return true; // localStorage guardado es suficiente
        }
      } catch (sheetError) {
        console.warn('⚠️ Error guardando en Sheets (progreso local OK):', sheetError);
        updateSyncStatus('error', 'Error de conexión');
        return true;
      }
    }
    
    return true;
  } catch (err) {
    console.error('❌ Error en updateModuleProgress:', err);
    updateSyncStatus('error', 'Error guardando');
    return false;
  }
}

// ✅ FUNCIÓN CORREGIDA: Registrar actividad del usuario
async function logUserActivity(activityType, moduleId = '', lessonId = '', details = {}) {
  try {
    const user = getCurrentUser();
    if (!user) {
      console.warn('⚠️ No hay usuario para registrar actividad');
      return false;
    }

    const params = {
      action: 'logActivity',
      userId: user.id || '',
      username: user.username || '',
      activityType: activityType,
      moduleId: moduleId.toString(),
      lessonId: lessonId.toString(),
      details: typeof details === 'string' ? details : JSON.stringify(details),
      sessionId: user.sessionId || ''
    };

    const result = await makeJSONPRequest('logActivity', params);

    if (result.success) {
      console.log(`✅ Actividad registrada: ${activityType}`);
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

// ✅ NUEVO: Agregar indicador de sincronización al DOM automáticamente
function injectSyncIndicator() {
  // Solo si el usuario NO es instructor
  const user = getCurrentUser();
  if (!user || user.role === 'instructor') return;
  
  // Buscar si ya existe
  if (document.getElementById('syncIndicator')) return;
  
  // Crear indicador flotante
  const indicator = document.createElement('div');
  indicator.id = 'syncIndicator';
  indicator.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    padding: 0.75rem 1.25rem;
    border-radius: 25px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 0.85rem;
    z-index: 9998;
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(indicator);
  
  // Actualizar con estado actual
  const syncStatus = localStorage.getItem(STORAGE_KEYS.syncStatus);
  if (syncStatus) {
    try {
      const status = JSON.parse(syncStatus);
      updateSyncStatus(status.status, status.message);
    } catch (e) {
      updateSyncStatus('synced', 'Sincronizado');
    }
  } else {
    updateSyncStatus('synced', 'Sincronizado');
  }
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
    console.log('Test 1: getProgress...');
    const result2 = await makeJSONPRequest('getProgress', {
      username: user.username
    });
    console.log('Resultado Test 1:', result2);

    console.log('Test 2: logActivity...');
    const result3 = await makeJSONPRequest('logActivity', {
      userId: user.id || '',
      username: user.username,
      activityType: 'test',
      moduleId: '1',
      lessonId: '1',
      details: JSON.stringify({ test: true }),
      sessionId: user.sessionId || ''
    });
    console.log('Resultado Test 2:', result3);

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

// ✅ NUEVO: Forzar sincronización manual
window.forceSyncProgress = async function() {
  const user = getCurrentUser();
  if (!user) {
    showToast('No hay sesión activa', 'error');
    return;
  }
  
  showToast('Sincronizando...', 'info');
  const success = await syncProgressFromSheets(user.username, true);
  
  if (success) {
    showToast('✅ Progreso sincronizado correctamente', 'success');
    // Recargar página para mostrar datos actualizados
    setTimeout(() => window.location.reload(), 1000);
  } else {
    showToast('Error al sincronizar', 'error');
  }
};

// Hacer disponible globalmente
window.testGoogleSheetsConnection = testGoogleSheetsConnection;

// =========================
// INICIALIZACIÓN
// =========================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ auth.js v4.0 inicializado completamente');
    console.log('🔄 Sistema de sincronización inteligente activo');
    console.log('🧪 Para probar: testGoogleSheetsConnection()');
    console.log('🔄 Para sincronizar: forceSyncProgress()');
    
    // Inyectar indicador de sincronización
    setTimeout(injectSyncIndicator, 500);
    
    // Si hay usuario autenticado, iniciar sincronización automática
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user && user.role !== 'instructor') {
        startAutoSync();
      }
    }
  });
} else {
  console.log('✅ auth.js v4.0 inicializado completamente');
  console.log('🔄 Sistema de sincronización inteligente activo');
  console.log('🧪 Para probar: testGoogleSheetsConnection()');
  console.log('🔄 Para sincronizar: forceSyncProgress()');
  
  // Inyectar indicador de sincronización
  setTimeout(injectSyncIndicator, 500);
  
  // Si hay usuario autenticado, iniciar sincronización automática
  if (isAuthenticated()) {
    const user = getCurrentUser();
    if (user && user.role !== 'instructor') {
      startAutoSync();
    }
  }
}

// =========================
// MANEJO DE VISIBILIDAD DE PÁGINA
// =========================

// ✅ NUEVO: Sincronizar cuando el usuario regresa a la pestaña
document.addEventListener('visibilitychange', async function() {
  if (!document.hidden && isAuthenticated()) {
    const user = getCurrentUser();
    if (user && user.role !== 'instructor') {
      console.log('👁️ Usuario regresó a la pestaña, sincronizando...');
      await syncProgressFromSheets(user.username, false);
    }
  }
});

// ✅ NUEVO: Sincronizar antes de cerrar la pestaña
window.addEventListener('beforeunload', function(e) {
  if (isAuthenticated() && isSyncing) {
    // Si hay sincronización en progreso, advertir al usuario
    e.preventDefault();
    e.returnValue = 'Hay una sincronización en progreso. ¿Seguro que quieres salir?';
  }
});
