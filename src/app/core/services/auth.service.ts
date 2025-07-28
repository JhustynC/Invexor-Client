import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = signal(false); // estado reactivo
  private readonly TOKEN_KEY = 'invexor_auth_token';
  private readonly USER_KEY = 'invexor_user_data';
  private readonly TOKEN_EXPIRY_HOURS = 24; // Token válido por 24 horas

  constructor() {
    // Verificar si hay una sesión válida al inicializar el servicio
    this.checkStoredSession();
  }

  login(username: string, password: string): boolean {
    // Simulación de autenticación real
    if (username === 'admin' && password === 'admin') {
      this._isLoggedIn.set(true);
      this.storeSession(username);
      return true;
    }
    return false;
  }

  logout() {
    this._isLoggedIn.set(false);
    this.clearSession();
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  // Obtener datos del usuario almacenados
  getCurrentUser(): { username: string } | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // Verificar si hay una sesión válida almacenada
  private checkStoredSession(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY);
    
    if (token && userData) {
      try {
        const tokenData = JSON.parse(token);
        const currentTime = new Date().getTime();
        
        // Verificar si el token no ha expirado
        if (tokenData.expiry > currentTime) {
          this._isLoggedIn.set(true);
          console.log('Sesión restaurada desde localStorage');
        } else {
          // Token expirado, limpiar storage
          this.clearSession();
          console.log('Token expirado, sesión limpiada');
        }
      } catch (error) {
        // Error al parsear, limpiar storage
        this.clearSession();
        console.error('Error al verificar sesión almacenada:', error);
      }
    }
  }

  // Almacenar sesión en localStorage
  private storeSession(username: string): void {
    const expiryTime = new Date().getTime() + (this.TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
    
    const tokenData = {
      token: this.generateSimpleToken(),
      expiry: expiryTime
    };
    
    const userData = {
      username: username,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
    
    console.log('Sesión almacenada en localStorage');
  }

  // Limpiar sesión del localStorage
  private clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    console.log('Sesión limpiada del localStorage');
  }

  // Generar un token simple (en producción usarías JWT)
  private generateSimpleToken(): string {
    return btoa(Date.now() + Math.random().toString()).replace(/[^a-zA-Z0-9]/g, '');
  }

  // Método para extender la sesión (opcional)
  extendSession(): void {
    if (this.isLoggedIn()) {
      const userData = this.getCurrentUser();
      if (userData) {
        this.storeSession(userData.username);
        console.log('Sesión extendida');
      }
    }
  }

  // Obtener tiempo restante de la sesión en minutos
  getSessionTimeRemaining(): number {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      try {
        const tokenData = JSON.parse(token);
        const currentTime = new Date().getTime();
        const timeRemaining = tokenData.expiry - currentTime;
        return Math.max(0, Math.floor(timeRemaining / (1000 * 60))); // en minutos
      } catch (error) {
        return 0;
      }
    }
    return 0;
  }
}
