// ============================================
// 🧪 SCRIPT DE VALIDACIÓN - GAMIFICACIÓN LMS
// ============================================
// Copia y pega este código en la consola del navegador (F12)
// para verificar que todo está instalado correctamente

console.log('%c🧪 INICIANDO VALIDACIÓN DE GAMIFICACIÓN', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
console.log('');

// ========================================
// TEST 1: Verificar funciones de auth.js
// ========================================
console.log('%c📋 TEST 1: Funciones de Gamificación', 'color: #2196F3; font-weight: bold;');

const functionsToCheck = [
    'initializeGamification',
    'getGamificationData',
    'awardPoints',
    'checkAndAwardBadge',
    'checkTimeBasedBadges',
    'showPointsNotification',
    'showBadgeNotification',
    'loadGamification'
];

let functionsOK = 0;
functionsToCheck.forEach(funcName => {
    if (typeof window[funcName] === 'function') {
        console.log(`✅ ${funcName}() existe`);
        functionsOK++;
    } else {
        console.log(`❌ ${funcName}() NO encontrada`);
    }
});

console.log(`Resultado: ${functionsOK}/${functionsToCheck.length} funciones encontradas`);
console.log('');

// ========================================
// TEST 2: Verificar usuario actual y rol
// ========================================
console.log('%c📋 TEST 2: Usuario y Rol', 'color: #2196F3; font-weight: bold;');

try {
    const user = getCurrentUser();
    if (user) {
        console.log('✅ Usuario autenticado:', user.username);
        console.log('   Rol:', user.role);
        console.log('   Nombre completo:', user.fullName || 'N/A');
        
        if (user.role === 'estudiante') {
            console.log('   🎮 Este usuario DEBE ver gamificación');
        } else {
            console.log('   🔒 Este usuario NO debe ver gamificación');
        }
    } else {
        console.log('❌ No hay usuario autenticado');
    }
} catch (error) {
    console.log('❌ Error obteniendo usuario:', error.message);
}
console.log('');

// ========================================
// TEST 3: Verificar elementos del DOM
// ========================================
console.log('%c📋 TEST 3: Elementos del DOM', 'color: #2196F3; font-weight: bold;');

const elementsToCheck = [
    'gamificationPanel',
    'totalPoints',
    'currentLevel',
    'badgesCount',
    'badgesShowcase'
];

let elementsOK = 0;
elementsToCheck.forEach(elementId => {
    const element = document.getElementById(elementId);
    if (element) {
        console.log(`✅ #${elementId} existe`);
        console.log(`   Display: ${element.style.display || 'default'}`);
        elementsOK++;
    } else {
        console.log(`❌ #${elementId} NO encontrado`);
    }
});

console.log(`Resultado: ${elementsOK}/${elementsToCheck.length} elementos encontrados`);
console.log('');

// ========================================
// TEST 4: Verificar datos de gamificación
// ========================================
console.log('%c📋 TEST 4: Datos de Gamificación', 'color: #2196F3; font-weight: bold;');

try {
    const user = getCurrentUser();
    if (user && user.role === 'estudiante') {
        const gamificationData = getGamificationData(user.username);
        console.log('✅ Datos de gamificación encontrados:');
        console.log('   Puntos:', gamificationData.points || 0);
        console.log('   Nivel:', gamificationData.level || 1);
        console.log('   Badges obtenidos:', (gamificationData.badges || []).length);
        console.log('   Badges:', gamificationData.badges || []);
    } else {
        console.log('ℹ️ Usuario no es estudiante, datos de gamificación no aplicables');
    }
} catch (error) {
    console.log('❌ Error obteniendo datos:', error.message);
}
console.log('');

// ========================================
// TEST 5: Panel visible según rol
// ========================================
console.log('%c📋 TEST 5: Visibilidad del Panel', 'color: #2196F3; font-weight: bold;');

try {
    const user = getCurrentUser();
    const panel = document.getElementById('gamificationPanel');
    
    if (!panel) {
        console.log('❌ Panel de gamificación no existe en el DOM');
    } else {
        const isVisible = panel.style.display !== 'none' && panel.style.display !== '';
        
        if (user && user.role === 'estudiante') {
            if (isVisible) {
                console.log('✅ Panel VISIBLE (correcto para estudiante)');
            } else {
                console.log('❌ Panel OCULTO (incorrecto para estudiante)');
                console.log('   Ejecuta: loadGamification() para mostrarlo');
            }
        } else {
            if (!isVisible) {
                console.log('✅ Panel OCULTO (correcto para ' + (user?.role || 'no estudiante') + ')');
            } else {
                console.log('⚠️ Panel VISIBLE (debería estar oculto para ' + (user?.role || 'no estudiante') + ')');
            }
        }
    }
} catch (error) {
    console.log('❌ Error verificando visibilidad:', error.message);
}
console.log('');

// ========================================
// TEST 6: Probar funciones manualmente
// ========================================
console.log('%c📋 TEST 6: Pruebas Manuales Disponibles', 'color: #2196F3; font-weight: bold;');
console.log('Ejecuta estos comandos para probar la gamificación:');
console.log('');
console.log('%c// Otorgar 10 puntos de prueba', 'color: #666');
console.log('%cconst user = getCurrentUser(); awardPoints(user.username, 10, "Prueba manual");', 'color: #FF9800');
console.log('');
console.log('%c// Desbloquear badge de prueba', 'color: #666');
console.log('%cconst user = getCurrentUser(); checkAndAwardBadge(user.username, "firstLesson", "🎯 1ª Lección");', 'color: #FF9800');
console.log('');
console.log('%c// Ver datos actuales', 'color: #666');
console.log('%cconst user = getCurrentUser(); getGamificationData(user.username);', 'color: #FF9800');
console.log('');
console.log('%c// Recargar gamificación', 'color: #666');
console.log('%cloadGamification();', 'color: #FF9800');
console.log('');

// ========================================
// RESUMEN FINAL
// ========================================
console.log('%c═══════════════════════════════════════', 'color: #4CAF50');
console.log('%c📊 RESUMEN DE VALIDACIÓN', 'color: #4CAF50; font-size: 14px; font-weight: bold;');
console.log('%c═══════════════════════════════════════', 'color: #4CAF50');

const totalTests = 5;
let passedTests = 0;

// Evaluar cada test
if (functionsOK === functionsToCheck.length) passedTests++;
if (elementsOK === elementsToCheck.length) passedTests++;

try {
    const user = getCurrentUser();
    if (user) passedTests++;
    
    const panel = document.getElementById('gamificationPanel');
    if (panel) passedTests++;
    
    if (user && user.role === 'estudiante') {
        const data = getGamificationData(user.username);
        if (data) passedTests++;
    } else {
        passedTests++; // OK si no es estudiante
    }
} catch (error) {
    // Ignorar errores en resumen
}

const percentage = Math.round((passedTests / totalTests) * 100);
const resultColor = percentage === 100 ? '#4CAF50' : percentage >= 60 ? '#FF9800' : '#f44336';

console.log(`%cTests aprobados: ${passedTests}/${totalTests} (${percentage}%)`, `color: ${resultColor}; font-weight: bold;`);

if (percentage === 100) {
    console.log('%c🎉 ¡GAMIFICACIÓN INSTALADA CORRECTAMENTE!', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
} else if (percentage >= 60) {
    console.log('%c⚠️ Gamificación parcialmente instalada', 'color: #FF9800; font-size: 14px; font-weight: bold;');
    console.log('%cRevisa los archivos que faltan', 'color: #FF9800;');
} else {
    console.log('%c❌ Gamificación NO instalada correctamente', 'color: #f44336; font-size: 14px; font-weight: bold;');
    console.log('%cVerifica que reemplazaste todos los archivos', 'color: #f44336;');
}

console.log('%c═══════════════════════════════════════', 'color: #4CAF50');
console.log('');
console.log('%c💡 TIPS:', 'color: #2196F3; font-weight: bold;');
console.log('1. Si faltan funciones → Verifica que auth-3.js esté cargado');
console.log('2. Si faltan elementos → Verifica que index.html sea el correcto');
console.log('3. Si panel no aparece → Ejecuta: loadGamification()');
console.log('4. Si nada funciona → Limpia caché y recarga (Ctrl+Shift+R)');
console.log('');
console.log('%c📚 Documentación completa: CORRECCIONES_APLICADAS.md', 'color: #9C27B0;');
