import { Component, NgModule } from '@angular/core';
import { TableCompositionComponent } from "../../../shared/components/table-composition/table-composition.component";

@Component({
  selector: 'app-profile',
  imports: [TableCompositionComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  selectedOption: string = 'areas';
  areas = [
    { id: 1, sucursal: 'Matriz', nombre: 'Área A', telefono: '123-456-7890', estado: 'Activo' },
    { id: 2, sucursal: 'Sucursal 1', nombre: 'Área B', telefono: '987-654-3210', estado: 'Inactivo' },
    // ... más datos de áreas
  ];
  branches = [
    { id: 101, nombre: 'Branch X', direccion: 'Calle Falsa 123', gerente: 'Carlos López', activo: true },
    { id: 102, nombre: 'Branch Y', direccion: 'Avenida Siempre Viva 742', gerente: 'Ana Vargas', activo: false },
    // ... más datos de branches
  ];
  resources = [
    { codigo: 'R-001', tipo: 'Servidor', descripcion: 'Servidor Principal', ubicacion: 'Rack 1', disponible: true },
    { codigo: 'R-002', tipo: 'Impresora', descripcion: 'Impresora Láser', ubicacion: 'Oficina 2', disponible: false },
    // ... más datos de recursos
  ];
  items = [
    { codigo: 'I-001', nombre: 'Escritorio', cantidad: 10, precio: 150.00, enStock: true },
    { codigo: 'I-002', nombre: 'Silla de oficina', cantidad: 25, precio: 75.50, enStock: true },
    // ... más datos de items
  ];

  columnNamesAreas = ['id', 'sucursal', 'nombre', 'telefono', 'estado'];
  columnNamesBranches = ['id', 'nombre', 'direccion', 'gerente', 'activo'];
  columnNamesResources = ['codigo', 'tipo', 'descripcion', 'ubicacion', 'disponible'];
  columnNamesItems = ['codigo', 'nombre', 'cantidad', 'precio', 'enStock'];

  currentData: any[] = this.areas; // Datos iniciales
  currentColumns: string[] = this.columnNamesAreas; // Columnas iniciales

  onOptionChange() {
    switch (this.selectedOption) {
      case 'areas':
        this.currentData = this.areas;
        this.currentColumns = this.columnNamesAreas;
        break;
      case 'branches':
        this.currentData = this.branches;
        this.currentColumns = this.columnNamesBranches;
        break;
      case 'resources':
        this.currentData = this.resources;
        this.currentColumns = this.columnNamesResources;
        break;
      case 'items':
        this.currentData = this.items;
        this.currentColumns = this.columnNamesItems;
        break;
      default:
        this.currentData = [];
        this.currentColumns = [];
        break;
    }
  }


}
