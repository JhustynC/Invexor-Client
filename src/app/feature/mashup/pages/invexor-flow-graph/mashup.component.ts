import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import * as THREE from 'three';

@Component({
  selector: 'mashup-feature',
  templateUrl: './mashup.component.html',
  styleUrls: ['./mashup.component.css'],
})
export default class MashupComponent implements AfterViewInit {
  @ViewChild('graphContainer', { static: false }) graphContainer?: ElementRef;

  graphInstance?: ForceGraph3DInstance;
  renderGraph = true;

  @HostListener('window:resize')
  onResize() {
    this.renderGraph = false;

    setTimeout(() => {
      this.renderGraph = true;

      // Esperamos a que el DOM se renderice completamente
      setTimeout(async () => {
        await this.initGraph();
      }, 0);
    }, 0);
  }

  async ngAfterViewInit(): Promise<void> {
    await this.initGraph();
  }

  // toggleGraph() {
  //   this.renderGraph = !this.renderGraph;
  //   this.initGraph();
  // }

  // Método para re-renderizar el gráfico
  async rechargeGraph() {
    this.renderGraph = false;
    setTimeout(async () => {
      this.renderGraph = true;
      await this.initGraph();
    }, 0);
  }

  private async initGraph() {
    if (!this.graphContainer) return;

    // Si ya existe una instancia, la destruimos
    if (this.graphInstance) {
      this.graphInstance.renderer().clear();
      this.graphInstance.renderer().dispose();
    }

    const graphData = {
      nodes: [
        { id: 'Sucursal Cuenca', group: 'sucursal' },
        { id: 'Sucursal Quito', group: 'sucursal' },
        { id: 'Finanzas Cuenca', group: 'area' },
        { id: 'Logística Cuenca', group: 'area' },
        { id: 'Ventas Cuenca', group: 'area' },
        { id: 'Finanzas Quito', group: 'area' },
        { id: 'RRHH Quito', group: 'area' },
        { id: 'Empleado A', group: 'empleado' },
        { id: 'Empleado B', group: 'empleado' },
        { id: 'Almacén Principal', group: 'infraestructura' },
        { id: 'Camión 1', group: 'vehículo' },
        { id: 'Punto de Venta 1', group: 'infraestructura' },
        { id: 'Empleado C', group: 'empleado' },
        { id: 'Empleado D', group: 'empleado' },
      ],
      links: [
        { source: 'Sucursal Cuenca', target: 'Finanzas Cuenca' },
        { source: 'Sucursal Cuenca', target: 'Logística Cuenca' },
        { source: 'Sucursal Cuenca', target: 'Ventas Cuenca' },
        { source: 'Sucursal Quito', target: 'Finanzas Quito' },
        { source: 'Sucursal Quito', target: 'RRHH Quito' },
        { source: 'Finanzas Cuenca', target: 'Empleado A' },
        { source: 'Finanzas Cuenca', target: 'Empleado B' },
        { source: 'Logística Cuenca', target: 'Almacén Principal' },
        { source: 'Logística Cuenca', target: 'Camión 1' },
        { source: 'Ventas Cuenca', target: 'Punto de Venta 1' },
        { source: 'RRHH Quito', target: 'Empleado C' },
        { source: 'RRHH Quito', target: 'Empleado D' },
      ],
    };

    const { width, height } = this.getContainerSize();

    this.graphInstance = new ForceGraph3D(this.graphContainer?.nativeElement)
      .graphData(graphData)
      .width(width)
      .height(height)
      .nodeLabel('id')
      .nodeAutoColorBy('group');

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
