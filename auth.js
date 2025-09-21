// auth.js - Sistema de Autenticación y Gestión Central
// Universidad Alberto Hurtado - LMS Dibujo Anatómico
// Desarrollado por Joselyn Vizcarra

// ================================
// CONFIGURACIÓN GLOBAL
// ================================

const APP_CONFIG = {
    name: 'LMS Dibujo Anatómico UAH',
    version: '3.0.0',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas
    autoSaveInterval: 30000, // 30 segundos
    debugMode: true,
    encryptionKey: 'UAH-LMS-2024', // En producción usar una clave segura
    apiEndpoint: '/api/v1/', // Para futura integración con backend
    features: {
        twoFactorAuth: false,
        socialLogin: false,
        offlineMode: true,
        analytics: true
    }
};

// ================================
// SISTEMA DE ENCRIPTACIÓN
// ================================

class SecurityManager {
    static encrypt(text) {
        // Encriptación simple para demo - en producción usar crypto-js o similar
        return btoa(encodeURIComponent(text + APP_CONFIG.encryptionKey));
    }

    static decrypt(encrypted) {
        try {
            const decrypted = decodeURIComponent(atob(encrypted));
            return decrypted.replace(APP_CONFIG.encryptionKey, '');
        } catch (e) {
            console.error('Error al desencriptar:', e);
            return null;
        }
    }

    static hashPassword(password) {
        // Hash simple para demo - en producción usar bcrypt o similar
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }

    static generateToken() {
        return 'TKN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    static validateToken(token) {
        // Validación simple de formato
        return token && token.startsWith('TKN_') && token.length > 20;
    }
}

// ================================
// GESTIÓN DE USUARIOS MEJORADA
// ================================

class UserManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.sessionId = null;
        this.sessionToken = null;
        this.loginAttempts = {};
        this.maxLoginAttempts = 5;
        this.lockoutDuration = 15 * 60 * 1000; // 15 minutos
    }

    // Cargar usuarios desde localStorage con validación
    loadUsers() {
        const defaultUsers = {
            'joselyn.vizcarra@uah.cl': {
                id: 'USR001',
                password: SecurityManager.hashPassword('admin123'),
                name: 'Joselyn Vizcarra',
                role: 'admin',
                permissions: ['all'],
                avatar: '👩‍🏫',
                created: '2024-01-01',
                lastLogin: null,
                status: 'active',
                preferences: {
                    theme: 'light',
                    notifications: true,
                    language: 'es'
                }
            },
            'estudiante1@uah.cl': {
                id: 'USR002',
                password: SecurityManager.hashPassword('est123'),
                name: 'María González',
                role: 'student',
                permissions: ['view_content', 'submit_tasks', 'view_grades'],
                avatar: '👩‍🎓',
                created: '2024-01-10',
                lastLogin: null,
                status: 'active',
                enrolledModules: [1, 2, 3, 4],
                preferences: {
                    theme: 'light',
                    notifications: true,
                    language: 'es'
                }
            },
            'estudiante2@uah.cl': {
                id: 'USR003',
                password: SecurityManager.hashPassword('est123'),
                name: 'Carlos Rodríguez',
                role: 'student',
                permissions: ['view_content', 'submit_tasks', 'view_grades'],
                avatar: '👨‍🎓',
                created: '2024-01-11',
                lastLogin: null,
                status: 'active',
                enrolledModules: [1, 2, 3, 4],
                preferences: {
                    theme: 'dark',
                    notifications: true,
                    language: 'es'
                }
            },
            'profesor@uah.cl': {
                id: 'USR004',
                password: SecurityManager.hashPassword('prof123'),
                name: 'Dr. Roberto Méndez',
                role: 'instructor',
                permissions: ['view_content', 'view_students', 'grade', 'create_content'],
                avatar: '👨‍🏫',
                created: '2024-01-05',
                lastLogin: null,
                status: 'active',
                assignedModules: [1, 2],
                preferences: {
                    theme: 'light',
                    notifications: true,
                    language: 'es'
                }
            },
            'invitado@demo.com': {
                id: 'USR005',
                password: SecurityManager.hashPassword('demo123'),
                name: 'Usuario Invitado',
                role: 'guest',
                permissions: ['view_demo'],
                avatar: '👤',
                created: '2024-01-15',
                lastLogin: null,
                status: 'active',
                preferences: {
                    theme: 'light',
                    notifications: false,
                    language: 'es'
                }
            }
        };

        const savedUsers = localStorage.getItem('systemUsers');
        if (savedUsers) {
            try {
                const decrypted = SecurityManager.decrypt(savedUsers);
                return { ...defaultUsers, ...JSON.parse(decrypted) };
            } catch (e) {
                console.error('Error loading users:', e);
                return defaultUsers;
            }
        }
        
        this.saveUsers(defaultUsers);
        return defaultUsers;
    }

    // Guardar usuarios encriptados
    saveUsers(users = this.users) {
        const encrypted = SecurityManager.encrypt(JSON.stringify(users));
        localStorage.setItem('systemUsers', encrypted);
    }

    // Verificar bloqueo por intentos fallidos
    isAccountLocked(email) {
        const attempts = this.loginAttempts[email];
        if (!attempts) return false;

        if (attempts.count >= this.maxLoginAttempts) {
            const timeSinceLock = Date.now() - attempts.lastAttempt;
            if (timeSinceLock < this.lockoutDuration) {
                const remainingTime = Math.ceil((this.lockoutDuration - timeSinceLock) / 60000);
                return { locked: true, remainingMinutes: remainingTime };
            } else {
                // Resetear intentos después del período de bloqueo
                delete this.loginAttempts[email];
                return false;
            }
        }
        return false;
    }

    // Registrar intento de login
    recordLoginAttempt(email, success) {
        if (success) {
            delete this.loginAttempts[email];
        } else {
            if (!this.loginAttempts[email]) {
                this.loginAttempts[email] = { count: 0, lastAttempt: Date.now() };
            }
            this.loginAttempts[email].count++;
            this.loginAttempts[email].lastAttempt = Date.now();
        }
    }

    // Autenticar usuario mejorado
    authenticate(email, password) {
        // Verificar bloqueo
        const lockStatus = this.isAccountLocked(email);
        if (lockStatus && lockStatus.locked) {
            return { 
                success: false, 
                error: `Cuenta bloqueada. Intenta en ${lockStatus.remainingMinutes} minutos.` 
            };
        }

        const user = this.users[email];
        
        if (!user) {
            this.recordLoginAttempt(email, false);
            return { success: false, error: 'Usuario no encontrado' };
        }

        // Verificar estado de cuenta
        if (user.status !== 'active') {
            return { success: false, error: 'Cuenta inactiva. Contacta al administrador.' };
        }

        // Verificar contraseña
        const hashedPassword = SecurityManager.hashPassword(password);
        if (user.password !== hashedPassword) {
            this.recordLoginAttempt(email, false);
            const attemptsLeft = this.maxLoginAttempts - (this.loginAttempts[email]?.count || 0);
            return { 
                success: false, 
                error: `Contraseña incorrecta. ${attemptsLeft} intentos restantes.` 
            };
        }

        // Login exitoso
        this.recordLoginAttempt(email, true);
        
        // Actualizar último login
        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        // Crear sesión
        this.currentUser = {
            ...user,
            email: email,
            loginTime: new Date().toISOString()
        };
        
        delete this.currentUser.password; // No guardar password en sesión
        
        this.sessionId = this.generateSessionId();
        this.sessionToken = SecurityManager.generateToken();
        this.saveSession();

        // Registrar actividad
        ActivityLogger.log('login', { 
            userId: user.id, 
            email: email,
            ip: this.getClientIP(),
            device: this.getDeviceInfo()
        });

        // Notificar login si está habilitado
        if (user.preferences?.notifications) {
            NotificationManager.send('login', user);
        }

        return { 
            success: true, 
            user: this.currentUser,
            token: this.sessionToken 
        };
    }

    // Obtener información del dispositivo
    getDeviceInfo() {
        const ua = navigator.userAgent;
        const isMobile = /Mobile|Android|iPhone/i.test(ua);
        const browser = this.getBrowserInfo();
        
        return {
            type: isMobile ? 'mobile' : 'desktop',
            browser: browser.name,
            browserVersion: browser.version,
            os: navigator.platform,
            screen: `${screen.width}x${screen.height}`
        };
    }

    // Obtener información del navegador
    getBrowserInfo() {
        const ua = navigator.userAgent;
        let name = 'Unknown';
        let version = 'Unknown';

        if (ua.indexOf('Firefox') > -1) {
            name = 'Firefox';
            version = ua.match(/Firefox\/(\d+)/)[1];
        } else if (ua.indexOf('Chrome') > -1) {
            name = 'Chrome';
            version = ua.match(/Chrome\/(\d+)/)[1];
        } else if (ua.indexOf('Safari') > -1) {
            name = 'Safari';
            version = ua.match(/Version\/(\d+)/)[1];
        }

        return { name, version };
    }

    // Obtener IP del cliente (simulado)
    getClientIP() {
        // En producción, esto vendría del servidor
        return '192.168.1.' + Math.floor(Math.random() * 255);
    }

    // Generar ID de sesión único
    generateSessionId() {
        return 'SES_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Guardar sesión con encriptación
    saveSession() {
        const sessionData = {
            user: this.currentUser,
            sessionId: this.sessionId,
            token: this.sessionToken,
            timestamp: Date.now(),
            expires: Date.now() + APP_CONFIG.sessionTimeout
        };
        
        const encrypted = SecurityManager.encrypt(JSON.stringify(sessionData));
        localStorage.setItem('currentSession', encrypted);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Guardar token en cookie segura (para producción)
        this.setSecureCookie('sessionToken', this.sessionToken, 1);
    }

    // Establecer cookie segura
    setSecureCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        
        // En producción agregar: Secure; SameSite=Strict
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;`;
    }

    // Verificar sesión activa mejorada
    checkSession() {
        const sessionData = localStorage.getItem('currentSession');
        
        if (!sessionData) return false;
        
        try {
            const decrypted = SecurityManager.decrypt(sessionData);
            const session = JSON.parse(decrypted);
            
            // Verificar expiración
            if (Date.now() > session.expires) {
                this.logout();
                return false;
            }
            
            // Verificar token
            if (!SecurityManager.validateToken(session.token)) {
                this.logout();
                return false;
            }
            
            // Renovar sesión si está cerca de expirar
            const timeUntilExpiry = session.expires - Date.now();
            if (timeUntilExpiry < 30 * 60 * 1000) { // 30 minutos
                this.renewSession();
            }
            
            this.currentUser = session.user;
            this.sessionId = session.sessionId;
            this.sessionToken = session.token;
            
            return true;
        } catch (e) {
            console.error('Error verificando sesión:', e);
            this.logout();
            return false;
        }
    }

    // Renovar sesión
    renewSession() {
        if (this.currentUser) {
            this.sessionToken = SecurityManager.generateToken();
            this.saveSession();
            ActivityLogger.log('session_renewed', { userId: this.currentUser.id });
        }
    }

    // Cerrar sesión mejorado
    logout() {
        if (this.currentUser) {
            ActivityLogger.log('logout', { 
                userId: this.currentUser.id,
                sessionDuration: Date.now() - new Date(this.currentUser.loginTime).getTime()
            });
            
            // Notificar logout
            if (this.currentUser.preferences?.notifications) {
                NotificationManager.send('logout', this.currentUser);
            }
        }
        
        this.currentUser = null;
        this.sessionId = null;
        this.sessionToken = null;
        
        // Limpiar datos de sesión
        localStorage.removeItem('currentSession');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('moduleProgress');
        
        // Limpiar cookies
        document.cookie = 'sessionToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    }

    // Cambiar contraseña
    changePassword(email, oldPassword, newPassword) {
        const user = this.users[email];
        
        if (!user) {
            return { success: false, error: 'Usuario no encontrado' };
        }
        
        const hashedOld = SecurityManager.hashPassword(oldPasswor
