import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface NavigationCommand {
  command: string;
  route: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly navigationMap: Record<string, NavigationCommand> = {
    'dashboard': {
      command: 'dashboard',
      route: '/client/dashboard',
      description: 'Dashboard - Resumen general'
    },
    'reports': {
      command: 'reports',
      route: '/client/reports',
      description: 'Reportes - Informes y estadísticas'
    },
    'mashup': {
      command: 'mashup',
      route: '/client/mashup',
      description: 'Mashup - Visualización de redes'
    },
    'profile': {
      command: 'profile',
      route: '/client/profile',
      description: 'Perfil - Información personal'
    },
    'settings': {
      command: 'settings',
      route: '/client/settings',
      description: 'Configuración - Ajustes del sistema'
    },
    'branches': {
      command: 'branches',
      route: '/client/entities-manager/branchs',
      description: 'Sucursales - Gestión de sucursales'
    },
    'areas': {
      command: 'areas',
      route: '/client/entities-manager/areas',
      description: 'Áreas - Gestión de áreas'
    },
    'items': {
      command: 'items',
      route: '/client/entities-manager/items',
      description: 'Items - Gestión de inventario'
    },
    'resources': {
      command: 'resources',
      route: '/client/entities-manager/resources',
      description: 'Recursos - Gestión de recursos'
    },
    'users': {
      command: 'users',
      route: '/client/entities-manager/users',
      description: 'Usuarios - Gestión de usuarios'
    }
  };

  constructor(private router: Router) {}

  /**
   * Procesa un mensaje del bot y ejecuta comandos de navegación si los encuentra
   */
  processNavigationCommands(message: string): string {
    let processedMessage = message;
    const navigationRegex = /\[NAVEGAR:(\w+)\]/g;
    let match;

    while ((match = navigationRegex.exec(message)) !== null) {
      const command = match[1];
      const fullMatch = match[0];
      
      if (this.navigationMap[command]) {
        // Reemplazar el comando con un botón clickeable
        const buttonHtml = `<button class="nav-button" data-route="${this.navigationMap[command].route}" onclick="window.navigateToPage('${this.navigationMap[command].route}')">
          📍 Ir a ${this.navigationMap[command].description}
        </button>`;
        
        processedMessage = processedMessage.replace(fullMatch, buttonHtml);
      }
    }

    return processedMessage;
  }

  /**
   * Navega a una ruta específica
   */
  navigateToPage(route: string): void {
    this.router.navigate([route]).then(success => {
      if (success) {
        console.log(`Navegación exitosa a: ${route}`);
      } else {
        console.error(`Error al navegar a: ${route}`);
      }
    });
  }

  /**
   * Obtiene todas las rutas disponibles
   */
  getAvailableRoutes(): NavigationCommand[] {
    return Object.values(this.navigationMap);
  }

  /**
   * Verifica si una ruta existe
   */
  isValidRoute(command: string): boolean {
    return command in this.navigationMap;
  }

  /**
   * Obtiene información de una ruta específica
   */
  getRouteInfo(command: string): NavigationCommand | null {
    return this.navigationMap[command] || null;
  }
}
