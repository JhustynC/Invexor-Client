import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  OnDestroy,
  inject
} from '@angular/core';
import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import * as THREE from 'three';
import { MashupService, GraphData } from '../../services/mashup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mashup-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mashup.component.html',
  styleUrls: ['./mashup.component.css'],
})
export default class MashupComponent implements AfterViewInit, OnDestroy {
  @ViewChild('graphContainer', { static: false }) graphContainer?: ElementRef;

  private mashupService = inject(MashupService);

  graphInstance?: ForceGraph3DInstance;
  renderGraph = true;
  isLoading = false;
  errorMessage: string | null = null;
  graphData: GraphData | null = null;

  @HostListener('window:resize')
  onResize() {
    this.renderGraph = false;

    setTimeout(() => {
      this.renderGraph = true;

      // Esperamos a que el DOM se renderice completamente
      setTimeout(async () => {
        // Usar los datos existentes si están disponibles
        if (this.graphData) {
          await this.initGraphWithData(this.graphData);
        }
      }, 0);
    }, 0);
  }

  ngAfterViewInit(): void {
    if (this.graphContainer) {
      this.loadGraphData();
    }
  }

  ngOnDestroy(): void {
    if (this.graphInstance) {
      this.graphInstance._destructor?.();
    }
  }

  /**
   * Carga los datos del gráfico desde el backend
   */
  loadGraphData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.mashupService.getGraphData().subscribe({
      next: (data: GraphData) => {
        this.graphData = data;
        this.isLoading = false;
        this.errorMessage = null; // Limpiar cualquier error previo

        // Verificar si son datos de fallback
        const isFallbackData = data.nodes.length === 1 && data.nodes[0].id === 'no-data';
        if (isFallbackData) {
          console.log('Using fallback data - backend may be unavailable');
        }

        if (this.graphContainer) {
          this.initGraphWithData(data);
        }
      },
      error: (error) => {
        // Este caso no debería ocurrir porque el servicio maneja errores con fallback
        console.error('Unexpected error loading graph data:', error);
        this.errorMessage = 'Error inesperado al cargar los datos del gráfico';
        this.isLoading = false;
      }
    });
  }

  /**
   * Inicializa el gráfico con datos reales del backend
   */
  private async initGraphWithData(graphData: GraphData): Promise<void> {
    if (!this.graphContainer) return;

    // Si ya existe una instancia, la destruimos
    if (this.graphInstance) {
      this.graphInstance.renderer().clear();
      this.graphInstance.renderer().dispose();
    }

    // Transformar los datos para ForceGraph3D
    const transformedData = this.mashupService.transformForForceGraph(graphData);

    console.log('Transformed graph data:', transformedData);

    const { width, height } = this.getContainerSize();

    this.graphInstance = new ForceGraph3D(this.graphContainer?.nativeElement)
      .graphData(transformedData)
      .width(width)
      .height(height)
      .nodeLabel('name') // ForceGraph3D usa 'name' para labels
      .nodeAutoColorBy('group')
      .nodeVal((node: any) => node.size || 8) // Tamaño del nodo
      .linkWidth(2)
      .linkOpacity(0.6)
      .linkDirectionalArrowLength(3.5)
      .linkDirectionalArrowRelPos(1)
      .onNodeHover((node: any) => {
        // Cambiar cursor al hacer hover
        this.graphContainer!.nativeElement.style.cursor = node ? 'pointer' : null;
      })
      .onNodeClick((node: any) => {
        // Log información del nodo al hacer click
        console.log('Node clicked:', node);
      });

    // Configurar el fondo del gráfico
    this.graphInstance.scene().background = new THREE.Color('#111827');

    // Agregar efecto bloom
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      4,
      1,
      0
    );

    this.graphInstance.postProcessingComposer().addPass(bloomPass);
  }

  // toggleGraph() {
  //   this.renderGraph = !this.renderGraph;
  //   this.initGraph();
  // }

  // Método para re-renderizar el gráfico
  rechargeGraph() {
    this.loadGraphData();
  }

  private async initGraph() {
    if (!this.graphContainer) return;

    // Si ya existe una instancia, la destruimos
    if (this.graphInstance) {
      this.graphInstance.renderer().clear();
      this.graphInstance.renderer().dispose();
    }

    // Verificar que tengamos datos antes de inicializar el gráfico
    if (!this.graphData) {
      console.warn('No graph data available for initialization');
      return;
    }

    // const graphData = {
    //   nodes: [
    //     { id: 'Sucursal Cuenca', group: 'sucursal' },
    //     { id: 'Sucursal Quito', group: 'sucursal' },
    //     { id: 'Finanzas Cuenca', group: 'area' },
    //     { id: 'Logística Cuenca', group: 'area' },
    //     { id: 'Ventas Cuenca', group: 'area' },
    //     { id: 'Finanzas Quito', group: 'area' },
    //     { id: 'RRHH Quito', group: 'area' },
    //     { id: 'Empleado A', group: 'empleado' },
    //     { id: 'Empleado B', group: 'empleado' },
    //     { id: 'Almacén Principal', group: 'infraestructura' },
    //     { id: 'Camión 1', group: 'vehículo' },
    //     { id: 'Punto de Venta 1', group: 'infraestructura' },
    //     { id: 'Empleado C', group: 'empleado' },
    //     { id: 'Empleado D', group: 'empleado' },
    //   ],
    //   links: [
    //     { source: 'Sucursal Cuenca', target: 'Finanzas Cuenca' },
    //     { source: 'Sucursal Cuenca', target: 'Logística Cuenca' },
    //     { source: 'Sucursal Cuenca', target: 'Ventas Cuenca' },
    //     { source: 'Sucursal Quito', target: 'Finanzas Quito' },
    //     { source: 'Sucursal Quito', target: 'RRHH Quito' },
    //     { source: 'Finanzas Cuenca', target: 'Empleado A' },
    //     { source: 'Finanzas Cuenca', target: 'Empleado B' },
    //     { source: 'Logística Cuenca', target: 'Almacén Principal' },
    //     { source: 'Logística Cuenca', target: 'Camión 1' },
    //     { source: 'Ventas Cuenca', target: 'Punto de Venta 1' },
    //     { source: 'RRHH Quito', target: 'Empleado C' },
    //     { source: 'RRHH Quito', target: 'Empleado D' },
    //   ],
    // };

    // Transformar los datos para ForceGraph3D
    const transformedData = this.mashupService.transformForForceGraph(this.graphData);

    const { width, height } = this.getContainerSize();

    this.graphInstance = new ForceGraph3D(this.graphContainer?.nativeElement)
      .graphData(transformedData)
      .width(width)
      .height(height)
      .nodeLabel('name') // ForceGraph3D usa 'name' para labels
      .nodeAutoColorBy('group')
      .nodeVal((node: any) => node.size || 8) // Tamaño del nodo
      .linkWidth(2)
      .linkOpacity(0.6)
      .linkDirectionalArrowLength(3.5)
      .linkDirectionalArrowRelPos(1)
      .onNodeHover((node: any) => {
        // Cambiar cursor al hacer hover
        this.graphContainer!.nativeElement.style.cursor = node ? 'pointer' : null;
      })
      .onNodeClick((node: any) => {
        // Log información del nodo al hacer click
        console.log('Node clicked:', node);
      });

    this.graphInstance.scene().background = new THREE.Color('#111827');

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      4,
      1,
      0
    );

    this.graphInstance.postProcessingComposer().addPass(bloomPass);
  }

  private getContainerSize(): { width: number; height: number } {
    const padding = 32; // 2rem (espacio alrededor)
    const maxWidth = 1000;
    const maxHeight = 700;

    let width = window.innerWidth - padding * 2;
    let height = window.innerHeight - padding * 2;

    //? En móviles: mantener card con padding
    if (window.innerWidth <= 800) {
      width = Math.min(width, 400);
      height = Math.min(height, 400);
    } else {
      width = Math.min(width, maxWidth);
      height = Math.min(height, maxHeight);
    }

    return { width, height };
  }

  onNgDestroy() {
    this.graphInstance?.renderer().clear();
    this.graphInstance?.renderer().dispose();
  }
}
