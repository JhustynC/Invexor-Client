import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface GraphNode {
  id: string;
  label: string;
  group: string;
  type: string;
  entity_id: number;
  [key: string]: any; // Para propiedades adicionales específicas de cada tipo
}

export interface GraphLink {
  source: string;
  target: string;
  type: string;
  amount?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

@Injectable({
  providedIn: 'root'
})
export class MashupService {
  private apiURL: string = `${environment.apiUrl}/dashboard/graph-data`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos del gráfico desde el backend
   * @returns Observable<GraphData> - Datos del gráfico con nodos y enlaces
   */
  getGraphData(): Observable<GraphData> {
    return this.http.get<GraphData>(this.apiURL).pipe(
      map((response: GraphData) => {
        console.log('Graph data API response:', response);

        // Validar que la respuesta tenga la estructura correcta
        if (!response || !Array.isArray(response.nodes) || !Array.isArray(response.links)) {
          console.error('Invalid graph data structure:', response);
          return this.getEmptyGraphData();
        }

        return {
          nodes: response.nodes.map(node => ({
            ...node,
            // Asegurar que cada nodo tenga las propiedades mínimas requeridas
            id: node.id || `unknown-${Math.random()}`,
            label: node.label || node.id || 'Unknown',
            group: node.group || 'default'
          })),
          links: response.links.map(link => ({
            ...link,
            // Asegurar que cada enlace tenga source y target válidos
            source: link.source,
            target: link.target,
            type: link.type || 'default'
          }))
        };
      }),
      catchError((error) => {
        console.error('Error fetching graph data:', error);
        return of(this.getEmptyGraphData());
      })
    );
  }

  /**
   * Retorna datos vacíos para casos de error
   */
  private getEmptyGraphData(): GraphData {
    return {
      nodes: [
        {
          id: 'no-data',
          label: 'No hay datos disponibles',
          group: 'error',
          type: 'error',
          entity_id: 0
        }
      ],
      links: []
    };
  }

  /**
   * Transforma los datos del backend al formato requerido por ForceGraph3D
   */
  transformForForceGraph(graphData: GraphData): { nodes: any[], links: any[] } {
    return {
      nodes: graphData.nodes.map(node => ({
        id: node.id,
        name: node.label, // ForceGraph3D usa 'name' para labels
        group: node.group,
        type: node.type,
        entity_id: node.entity_id,
        // Agregar propiedades adicionales según el tipo
        ...this.getNodeProperties(node)
      })),
      links: graphData.links.map(link => ({
        source: link.source,
        target: link.target,
        type: link.type,
        amount: link.amount || 1
      }))
    };
  }

  /**
   * Obtiene propiedades adicionales específicas para cada tipo de nodo
   */
  private getNodeProperties(node: GraphNode): any {
    const baseProps = {
      description: node.label,
      color: this.getNodeColor(node.group)
    };

    switch (node.type) {
      case 'branch':
        return {
          ...baseProps,
          city: node['city'] || 'Unknown',
          size: 15
        };
      case 'area':
        return {
          ...baseProps,
          description: node['description'] || node.label,
          size: 12
        };
      case 'user':
        return {
          ...baseProps,
          email: node['email'] || '',
          roles: node['roles'] || '',
          size: 10
        };
      case 'item':
        return {
          ...baseProps,
          provider: node['provider'] || '',
          item_type: node['item_type'] || '',
          size: 8
        };
      case 'resource':
        return {
          ...baseProps,
          measure: node['measure'] || '',
          currency: node['currency'] || '',
          size: 10
        };
      default:
        return {
          ...baseProps,
          size: 8
        };
    }
  }

  /**
   * Obtiene el color del nodo basado en su grupo
   */
  private getNodeColor(group: string): string {
    const colorMap: { [key: string]: string } = {
      'branch': '#3b82f6',      // Azul
      'area': '#10b981',        // Verde
      'user': '#f59e0b',        // Amarillo
      'item': '#ef4444',        // Rojo
      'resource': '#8b5cf6',    // Púrpura
      'error': '#6b7280',       // Gris
      'default': '#374151'      // Gris oscuro
    };

    return colorMap[group] || colorMap['default'];
  }
}
