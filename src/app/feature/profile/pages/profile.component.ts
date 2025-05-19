import { Component, NgModule, signal } from '@angular/core';
import { TableCompositionComponent } from '../../../shared/components/table-composition/table-composition.component';

@Component({
  selector: 'app-profile',
  imports: [TableCompositionComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  selectedOption: string = 'areas';
  areas = signal([
    {
      id: 1,
      sucursal: 'Matriz',
      nombre: 'Área A',
      telefono: '123-456-7890',
      estado: 'Activo',
    },
    {
      id: 2,
      sucursal: 'Sucursal 1',
      nombre: 'Área B',
      telefono: '987-654-3210',
      estado: 'Inactivo',
    },
    // ... más datos de áreas
  ]);
  branches = signal([
    {
      id: 101,
      nombre: 'Branch X',
      direccion: 'Calle Falsa 123',
      gerente: 'Carlos López',
      activo: true,
    },
    {
      id: 102,
      nombre: 'Branch Y',
      direccion: 'Avenida Siempre Viva 742',
      gerente: 'Ana Vargas',
      activo: false,
    },
    // ... más datos de branches
  ]);
  resources = signal([
    {
      codigo: 'R-001',
      tipo: 'Servidor',
      descripcion: 'Servidor Principal',
      ubicacion: 'Rack 1',
      disponible: true,
    },
    {
      codigo: 'R-002',
      tipo: 'Impresora',
      descripcion: 'Impresora Láser',
      ubicacion: 'Oficina 2',
      disponible: false,
    },
    // ... más datos de recursos
  ]);
  items = signal([
    {
      codigo: 'I-001',
      nombre: 'Escritorio',
      cantidad: 10,
      precio: 150.0,
      enStock: true,
    },
    {
      codigo: 'I-002',
      nombre: 'Silla de oficina',
      cantidad: 25,
      precio: 75.5,
      enStock: true,
    },
    // ... más datos de items
  ]);

  columnNamesAreas = signal<string[]>([
    'id',
    'sucursal',
    'nombre',
    'telefono',
    'estado',
  ]);
  columnNamesBranches = signal<string[]>([
    'id',
    'nombre',
    'direccion',
    'gerente',
    'activo',
  ]);
  columnNamesResources = signal<string[]>([
    'codigo',
    'tipo',
    'descripcion',
    'ubicacion',
    'disponible',
  ]);
  columnNamesItems = signal<string[]>([
    'codigo',
    'nombre',
    'cantidad',
    'precio',
    'enStock',
  ]);

  currentData = signal<any>(this.areas()); // Datos iniciales
  currentColumns = signal(this.columnNamesAreas()); // Columnas iniciales

  onOptionChange(event: any) {
    //console.log('Opción seleccionada:', event);
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(selectedValue);
    switch (selectedValue) {
      case 'areas':
        this.currentData.set(this.areas());
        this.currentColumns.set(this.columnNamesAreas());
        break;
      case 'branches':
        this.currentData.set(this.branches());
        this.currentColumns.set(this.columnNamesBranches());
        break;
      case 'resources':
        this.currentData.set(this.resources());
        this.currentColumns.set(this.columnNamesResources());
        break;
      case 'items':
        this.currentData.set(this.items());
        this.currentColumns.set(this.columnNamesItems());
        break;
      default:
        this.currentData.set([]); // Si no hay opción válida, vaciar los datos
        this.currentColumns.set([]); // Vaciar las columnas
        break;
    }
  }
}
