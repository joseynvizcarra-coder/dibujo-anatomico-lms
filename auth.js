// =====================================================
// auth.js v4.2 - LMS Dibujo Anatómico (UAH)
// Universidad Alberto Hurtado - Joselyn Vizcarra
// FIX CRÍTICO: Race condition y borrado de datos CORREGIDO
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

// ✅ NUEVO: Flags globales para controlar race condition
window.isSyncComplete = false;
window.isSyncInProgress = false;

// Estado global de sincronización
let syncInterval = null;
let isSyncing = false;

console.log('✅ auth.js v4.2 cargado - FIX race condition implementado');

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

      // ✅ Sincronizar progreso inmediatamente después del login
      console.log('🔄 Sincronizando progreso desde Google Sheets...');
      await syncProgressFromSheets(username, true);

      // ✅ Iniciar sincronización automática en segundo plano
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
// ✅ SISTEMA DE SINCRONIZACIÓN CORREGIDO
// =========================

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

function stopAutoSync() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
    console.log('⏹️ Sincronización automática detenida');
  }
}

// ✅ FUNCIÓN CRÍTICA CORREGIDA: Sincronizar progreso con protección contra borrado
async function syncProgressFromSheets(username, force = false, retries = 0) {
  if (isSyncing && !force) {
    console.log('⏳ Sincronización ya en progreso, saltando...');
    return false;
  }
  
  // ✅ BLOQUEAR otras operaciones durante sync
  window.isSyncInProgress = true;
  isSyncing = true;
  updateSyncStatus('syncing', 'Sincronizando...');
  
  try {
    console.log(`🔍 Consultando progreso de ${username} en Sheets...`);
    const result = await makeJSONPRequestWithRetry('getProgress', { username }, MAX_RETRIES);
    
    console.log('📦 Respuesta de Sheets:', result);
    
    if (result.success && result.data) {
      const progressKey = STORAGE_KEYS.progress(username);
      const lastSyncKey = STORAGE_KEYS.lastSync(username);
      
      const localProgress = localStorage.getItem(progressKey);
      let shouldUpdate = true;
      
      // ✅ VALIDACIÓN MEJORADA: Verificar que modules existe Y tiene contenido
      if (!result.data.modules || Object.keys(result.data.modules).length === 0) {
        console.warn('⚠️ Sheets sin datos válidos (modules vacío o inexistente)');
        updateSyncStatus('synced', 'Sin datos remotos');
        
        // ✅ Si hay datos locales, SUBIRLOS en vez de borrarlos
        if (localProgress) {
          try {
            const localData = JSON.parse(localProgress);
            const localLessons = Object.values(localData.modules || {}).reduce((sum, m) => 
              sum + (Array.isArray(m.completedLessons) ? m.completedLessons.length : 0), 0);
            
            if (localLessons > 0) {
              console.log('🛡️ PROTECCIÓN: Local tiene datos, subiendo a Sheets...');
              await updateModuleProgress(null, localData, true);
            }
          } catch (e) {
            console.error('Error procesando datos locales:', e);
          }
        }
        
        isSyncing = false;
        window.isSyncInProgress = false;
        window.isSyncComplete = true;
        return false;
      }
      
      // Calcular progreso remoto
      const remoteCompleted = Object.values(result.data.modules || {}).filter(m => m.completed).length;
      const remoteLessons = Object.values(result.data.modules || {}).reduce((sum, m) => 
        sum + (Array.isArray(m.completedLessons) ? m.completedLessons.length : 0), 0);
      
      console.log(`📊 Progreso remoto: ${remoteCompleted} módulos, ${remoteLessons} lecciones`);
      
      if (localProgress && !force) {
        try {
          const localData = JSON.parse(localProgress);
          
          const localCompleted = Object.values(localData.modules || {}).filter(m => m.completed).length;
          const localLessons = Object.values(localData.modules || {}).reduce((sum, m) => 
            sum + (Array.isArray(m.completedLessons) ? m.completedLessons.length : 0), 0);
          
          console.log(`🔄 Comparando:
            📱 Local: ${localCompleted} módulos, ${localLessons} lecciones
            ☁️ Remoto: ${remoteCompleted} módulos, ${remoteLessons} lecciones`);
          
          // ✅ CRITERIO 1: Sheets vacío + local tiene datos = SUBIR
          if (remoteCompleted === 0 && remoteLessons === 0 && (localCompleted > 0 || localLessons > 0)) {
            console.log('🛡️ PROTECCIÓN: Sheets vacío, conservando datos locales');
            await updateModuleProgress(null, localData, true);
            shouldUpdate = false;
          }
          // ✅ CRITERIO 2: Local > Remoto = SUBIR
          else if (localCompleted > remoteCompleted || (localCompleted === remoteCompleted && localLessons > remoteLessons)) {
            console.log('⬆️ Local tiene más progreso, subiendo...');
            await updateModuleProgress(null, localData, true);
            shouldUpdate = false;
          }
          // ✅ CRITERIO 3: Remoto > Local = DESCARGAR
          else if (remoteCompleted > localCompleted || (remoteCompleted === localCompleted && remoteLessons > localLessons)) {
            console.log('⬇️ Remoto tiene más progreso, descargando...');
            shouldUpdate = true;
          }
          // ✅ CRITERIO 4: Mismo progreso, comparar timestamps
          else {
            const localTime = new Date(localData.lastActivity || 0).getTime();
            const remoteTime = new Date(result.data.lastActivity || 0).getTime();
            
            if (remoteTime > localTime) {
              console.log('⬇️ Mismo progreso, timestamp remoto más reciente');
              shouldUpdate = true;
            } else {
              console.log('✅ Datos sincronizados');
              shouldUpdate = false;
            }
          }
        } catch (e) {
          console.warn('⚠️ Error comparando:', e);
          shouldUpdate = remoteLessons > 0;
        }
      } else {
        // No hay datos locales O es forzado
        if (remoteCompleted === 0 && remoteLessons === 0) {
          console.log('ℹ️ Sheets vacío y sin local, no actualizar');
          shouldUpdate = false;
        } else {
          console.log('📥 Sin datos locales, descargando de Sheets...');
          shouldUpdate = true;
        }
      }
      
      if (shouldUpdate) {
        const validatedData = validateAndMigrateProgress(result.data);
        localStorage.setItem(progressKey, JSON.stringify(validatedData));
        console.log('✅ Progreso sincronizado desde Sheets');
      }
      
      localStorage.setItem(lastSyncKey, new Date().toISOString());
      updateSyncStatus('synced', 'Sincronizado');
      
      isSyncing = false;
      window.isSyncInProgress = false;
      window.isSyncComplete = true; // ✅ Indicar que sync terminó
      return true;
      
    } else {
      throw new Error(result.error || 'No se pudo obtener progreso');
    }
    
  } catch (error) {
    console.error('❌ Error sincronizando:', error);
    
    if (retries < MAX_RETRIES) {
      const delay = Math.pow(2, retries) * 1000;
      console.log(`🔄 Reintentando en ${delay/1000}s... (${retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      isSyncing = false;
      window.isSyncInProgress = false;
      return syncProgressFromSheets(username, force, retries + 1);
    }
    
    updateSyncStatus('error', 'Error de sincronización');
    isSyncing = false;
    window.isSyncInProgress = false;
    window.isSyncComplete = true; // ✅ Marcar como completa aunque falle
    return false;
  }
}

// =========================
// GESTIÓN DE PROGRESO
// =========================

async function getStudentProgress(forceSync = false) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const progressKey = STORAGE_KEYS.progress(currentUser.username);
  
  if (forceSync) {
    console.log('🔄 Sincronización forzada solicitada...');
    await syncProgressFromSheets(currentUser.username, true);
  }
  
  const localProgress = localStorage.getItem(progressKey);

  if (localProgress) {
    try {
      const parsed = JSON.parse(localProgress);
      return validateAndMigrateProgress(parsed);
    } catch (error) {
      console.error('❌ Error parseando progreso local:', error);
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

  // ✅ Si no hay localStorage, consultar Sheets primero
  console.log('📥 No hay progreso local, consultando Google Sheets...');
  await syncProgressFromSheets(currentUser.username, true);
  
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

  console.log('ℹ️ Usuario sin progreso previo, inicializando...');
  return initializeEmptyProgress();
}

function validateAndMigrateProgress(progress) {
  if (!progress.modules) {
    console.warn('⚠️ Formato viejo detectado, migrando automáticamente...');
    return initializeEmptyProgress();
  }
  
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
      console.warn(`⚠️ Módulo ${i}: completedLessons es number, migrando...`);
      progress.modules[i].completedLessons = [];
    }
    
    if (!Array.isArray(progress.modules[i].completedLessons)) {
      console.warn(`⚠️ Módulo ${i}: completedLessons no es array, corrigiendo...`);
      progress.modules[i].completedLessons = [];
    }
    
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
    lastActivity: null
  };
}

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

    if (!skipSync) {
      console.log('🔄 Sincronizando antes de guardar...');
      await syncProgressFromSheets(currentUser.username, false);
    }

    let currentProgress = await getStudentProgress(false);
    
    if (!currentProgress || !currentProgress.modules) {
      console.warn('⚠️ currentProgress no válido, inicializando...');
      currentProgress = initializeEmptyProgress();
    }

    if (moduleNumber === null) {
      currentProgress = { ...currentProgress, ...progressData };
    } else {
      if (moduleNumber < 1 || moduleNumber > TOTAL_MODULES) {
        console.error(`❌ Número de módulo inválido: ${moduleNumber}`);
        return false;
      }

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

      currentProgress.modules[moduleNumber] = {
        ...currentProgress.modules[moduleNumber],
        ...progressData,
        lastUpdate: new Date().toISOString()
      };
    }

    const completedModules = Object.values(currentProgress.modules).filter(m => m.completed).length;
    currentProgress.overallProgress = Math.round((completedModules / TOTAL_MODULES) * 100);
    currentProgress.totalTimeSpent = Object.values(currentProgress.modules).reduce((sum, m) => sum + (m.timeSpent || 0), 0);
    currentProgress.lastActivity = new Date().toISOString();

    const progressKey = STORAGE_KEYS.progress(currentUser.username);
    localStorage.setItem(progressKey, JSON.stringify(currentProgress));
    console.log(`💾 Progreso guardado en localStorage`);

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
          return true;
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

async function makeJSONPRequestWithRetry(action, params = {}, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await makeJSONPRequest(action, params);
      return result;
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 500;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
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

function updateSyncStatus(status, message) {
  localStorage.setItem(STORAGE_KEYS.syncStatus, JSON.stringify({ status, message, timestamp: new Date().toISOString() }));
  
  const syncIndicator = document.getElementById('syncIndicator');
  if (syncIndicator) {
    const icons = {
      synced: '✅',
      syncing: '🔄',
      error: '⚠️',
      offline: '🔴'
    };
    
    const colors = {
      synced: '#4CAF50',
      syncing: '#2196F3',
      error: '#f44336',
      offline: '#9E9E9E'
    };
    
    syncIndicator.innerHTML = `<span style="color: ${colors[status]}">${icons[status]} ${message}</span>`;
  }
  
  window.dispatchEvent(new CustomEvent('syncStatusChanged', { detail: { status, message } }));
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

function injectSyncIndicator() {
  const user = getCurrentUser();
  if (!user || user.role === 'instructor') return;
  
  if (document.getElementById('syncIndicator')) return;
  
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
    setTimeout(() => window.location.reload(), 1000);
  } else {
    showToast('Error al sincronizar', 'error');
  }
};

window.debugProgress = function() {
  const user = getCurrentUser();
  if (!user) {
    console.log('❌ No hay usuario autenticado');
    return;
  }
  
  const progressKey = STORAGE_KEYS.progress(user.username);
  const localProgress = localStorage.getItem(progressKey);
  
  if (localProgress) {
    try {
      const parsed = JSON.parse(localProgress);
      console.log('📊 PROGRESO LOCAL:', parsed);
      console.log('📈 Progreso general:', parsed.overallProgress + '%');
      console.log('📚 Módulos:', parsed.modules);
      
      const completed = Object.values(parsed.modules || {}).filter(m => m.completed).length;
      const lessons = Object.values(parsed.modules || {}).reduce((sum, m) => 
        sum + (Array.isArray(m.completedLessons) ? m.completedLessons.length : 0), 0);
      
      console.log(`✅ ${completed} módulos completados`);
      console.log(`📝 ${lessons} lecciones completadas`);
      console.log(`⏰ Última actividad: ${parsed.lastActivity}`);
    } catch (e) {
      console.error('❌ Error parseando progreso:', e);
    }
  } else {
    console.log('ℹ️ No hay progreso local guardado');
  }
};

window.testGoogleSheetsConnection = testGoogleSheetsConnection;

// ✅ EXPORTAR funciones globalmente para módulos
window.syncProgressFromSheets = syncProgressFromSheets;
window.validateAndMigrateProgress = validateAndMigrateProgress;
window.initializeEmptyProgress = initializeEmptyProgress;

// =========================
// INICIALIZACIÓN
// =========================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ auth.js v4.2 inicializado completamente');
    console.log('🔄 Sistema de sincronización inteligente activo');
    console.log('🛡️ Protección contra borrado de datos activada');
    console.log('');
    console.log('🧪 Funciones de testing disponibles:');
    console.log('   • testGoogleSheetsConnection() - Probar conexión');
    console.log('   • forceSyncProgress() - Forzar sincronización');
    console.log('   • debugProgress() - Ver estado actual del progreso');
    
    setTimeout(injectSyncIndicator, 500);
    
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user && user.role !== 'instructor') {
        startAutoSync();
      }
    }
  });
} else {
  console.log('✅ auth.js v4.2 inicializado completamente');
  console.log('🔄 Sistema de sincronización inteligente activo');
  console.log('🛡️ Protección contra borrado de datos activada');
  console.log('');
  console.log('🧪 Funciones de testing disponibles:');
  console.log('   • testGoogleSheetsConnection() - Probar conexión');
  console.log('   • forceSyncProgress() - Forzar sincronización');
  console.log('   • debugProgress() - Ver estado actual del progreso');
  
  setTimeout(injectSyncIndicator, 500);
  
  if (isAuthenticated()) {
    const user = getCurrentUser();
    if (user && user.role !== 'instructor') {
      startAutoSync();
    }
  }
}

// =========================
// 🎮 SISTEMA DE GAMIFICACIÓN
// =========================

function initializeGamification(username) {
  const gamificationKey = `gamification_${username}`;
  const existing = localStorage.getItem(gamificationKey);
  
  if (!existing) {
    const gamificationData = {
      points: 0,
      level: 1,
      badges: [],
      achievements: {
        firstLesson: false,
        firstModule: false,
        halfwayCourse: false,
        allModules: false,
        perfectWeek: false,
        earlyBird: false,
        nightOwl: false
      },
      streaks: {
        current: 0,
        longest: 0,
        lastActivity: null
      }
    };
    localStorage.setItem(gamificationKey, JSON.stringify(gamificationData));
    return gamificationData;
  }
  return JSON.parse(existing);
}

function getGamificationData(username) {
  const gamificationKey = `gamification_${username}`;
  const data = localStorage.getItem(gamificationKey);
  return data ? JSON.parse(data) : initializeGamification(username);
}

function saveGamificationData(username, data) {
  const gamificationKey = `gamification_${username}`;
  localStorage.setItem(gamificationKey, JSON.stringify(data));
}

function awardPoints(username, points, reason) {
  const data = getGamificationData(username);
  
  data.points = (data.points || 0) + points;
  data.level = Math.floor(data.points / 100) + 1;
  
  saveGamificationData(username, data);
  
  if (typeof showPointsNotification === 'function') {
    showPointsNotification(points, reason);
  }
  
  return data;
}

function checkAndAwardBadge(username, badgeId, badgeName) {
  const data = getGamificationData(username);
  
  if (!data.badges) data.badges = [];
  
  if (!data.badges.includes(badgeId)) {
    data.badges.push(badgeId);
    saveGamificationData(username, data);
    
    if (typeof showBadgeNotification === 'function') {
      showBadgeNotification(badgeName);
    }
    return true;
  }
  return false;
}

function checkTimeBasedBadges(username) {
  const hour = new Date().getHours();
  
  if (hour < 8) {
    checkAndAwardBadge(username, 'earlyBird', '🌅 Madrugador');
    awardPoints(username, 5, 'Bonus madrugador');
  } else if (hour >= 22) {
    checkAndAwardBadge(username, 'nightOwl', '🦉 Noctámbulo');
    awardPoints(username, 5, 'Bonus nocturno');
  }
}

// Exportar funciones globalmente
window.initializeGamification = initializeGamification;
window.getGamificationData = getGamificationData;
window.awardPoints = awardPoints;
window.checkAndAwardBadge = checkAndAwardBadge;
window.checkTimeBasedBadges = checkTimeBasedBadges;

// =========================
// MANEJO DE VISIBILIDAD DE PÁGINA
// =========================

document.addEventListener('visibilitychange', async function() {
  if (!document.hidden && isAuthenticated()) {
    const user = getCurrentUser();
    if (user && user.role !== 'instructor') {
      console.log('👁️ Usuario regresó a la pestaña, sincronizando...');
      await syncProgressFromSheets(user.username, false);
    }
  }
});

window.addEventListener('beforeunload', function(e) {
  if (isAuthenticated() && isSyncing) {
    e.preventDefault();
    e.returnValue = 'Hay una sincronización en progreso. ¿Seguro que quieres salir?';
  }
});
