import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  private warningTimer?: number;
  private logoutTimer?: number;
  private readonly WARNING_MINUTES = 5; // Advertir 5 minutos antes de expirar
  
  constructor() {
    this.startSessionMonitoring();
  }

  private startSessionMonitoring(): void {
    // Verificar cada minuto el estado de la sesión
    setInterval(() => {
      if (this.authService.isLoggedIn()) {
        const timeRemaining = this.authService.getSessionTimeRemaining();
        
        if (timeRemaining <= 0) {
          // Sesión expirada
          this.handleSessionExpired();
        } else if (timeRemaining <= this.WARNING_MINUTES && !this.warningTimer) {
          // Mostrar advertencia
          this.showSessionWarning(timeRemaining);
        }
      }
    }, 60000); // Cada minuto
  }

  private handleSessionExpired(): void {
    console.log('Sesión expirada, redirigiendo al login');
    this.authService.logout();
    this.router.navigate(['/login']);
    
    // Mostrar notificación (opcional)
    this.showNotification('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 'warning');
  }

  private showSessionWarning(timeRemaining: number): void {
    this.warningTimer = window.setTimeout(() => {
      const shouldExtend = confirm(
        `Tu sesión expirará en ${timeRemaining} minutos. ¿Deseas extenderla?`
      );
      
      if (shouldExtend) {
        this.authService.extendSession();
        this.showNotification('Sesión extendida exitosamente', 'success');
      }
      
      this.warningTimer = undefined;
    }, 1000);
  }

  private showNotification(message: string, type: 'success' | 'warning' | 'error'): void {
    // Implementación simple de notificación
    // En una aplicación real, usarías un servicio de notificaciones más sofisticado
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Crear notificación visual simple
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);
  }

  // Método para extender sesión manualmente
  extendSession(): void {
    this.authService.extendSession();
    this.showNotification('Sesión extendida por 24 horas más', 'success');
  }

  // Método para obtener información de la sesión
  getSessionInfo() {
    return {
      user: this.authService.getCurrentUser(),
      timeRemaining: this.authService.getSessionTimeRemaining(),
      isLoggedIn: this.authService.isLoggedIn()
    };
  }

  // Limpiar timers al destruir el servicio
  ngOnDestroy(): void {
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
    }
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }
}
