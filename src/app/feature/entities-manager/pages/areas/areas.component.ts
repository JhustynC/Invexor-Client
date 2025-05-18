import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { JsonFormComponent } from '../../../../shared/components/json-form/json-form.component';
import { TableCompositionComponent } from '../../../../shared/components/table-composition/table-composition.component';
import { UpgratedFormComponent } from '../../../../shared/components/upgrated-form/upgrated-form.component';

@Component({
  selector: 'areas-entites-manager',
  imports: [TableCompositionComponent, UpgratedFormComponent],
  templateUrl: './areas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AreasComponent {

  
  openPopup = signal<boolean>(false);
  formData = signal<any>(undefined);
  selectedTableArea = signal<any>(undefined);

  areas = [
    { id: "A1", sucursal: "Sucursal A", nombre: "Area A", telefono: "07-1234567", estado: "Activa", description: "Area de ventas" },
    { id: "A2", sucursal: "Sucursal B", nombre: "Area B", telefono: "02-7654321", estado: "Inactiva", description: "Area de compras" },
    { id: "A3", sucursal: "Sucursal C", nombre: "Area C", telefono: "04-9876543", estado: "Activa", description: "Area de soporte" },
    { id: "A4", sucursal: "Sucursal D", nombre: "Area D", telefono: "07-1112233", estado: "Activa", description: "Area de marketing" },
    { id: "A5", sucursal: "Sucursal E", nombre: "Area E", telefono: "03-3344556", estado: "Inactiva", description: "Area de recursos humanos" },
    { id: "A6", sucursal: "Sucursal F", nombre: "Area F", telefono: "03-9988776", estado: "Activa", description: "Area de finanzas" },
    { id: "A7", sucursal: "Sucursal G", nombre: "Area G", telefono: "05-2233445", estado: "Activa", description: "Area de IT" },
    { id: "A8", sucursal: "Sucursal H", nombre: "Area H", telefono: "06-6677889", estado: "Inactiva", description: "Area de legal" },
    { id: "A9", sucursal: "Sucursal I", nombre: "Area I", telefono: "06-5544332", estado: "Activa", description: "Area de logística" },
    { id: "A10", sucursal: "Sucursal J", nombre: "Area J", telefono: "06-3344556", estado: "Activa", description: "Area de ventas" },
    { id: "A11", sucursal: "Sucursal K", nombre: "Area K", telefono: "07-2233445", estado: "Activa", description: "Area de compras" },
    { id: "A12", sucursal: "Sucursal L", nombre: "Area L", telefono: "02-1234567", estado: "Inactiva", description: "Area de atención al cliente" },
    { id: "A13", sucursal: "Sucursal M", nombre: "Area M", telefono: "04-2233445", estado: "Activa", description: "Area de investigación" },
    { id: "A14", sucursal: "Sucursal N", nombre: "Area N", telefono: "07-9988776", estado: "Activa", description: "Area de desarrollo" },
    { id: "A15", sucursal: "Sucursal O", nombre: "Area O", telefono: "03-5544332", estado: "Inactiva", description: "Area de recursos humanos" },
    { id: "A16", sucursal: "Sucursal P", nombre: "Area P", telefono: "05-3344556", estado: "Activa", description: "Area de marketing" },
    { id: "A17", sucursal: "Sucursal Q", nombre: "Area Q", telefono: "06-4455667", estado: "Activa", description: "Area de ventas" }
  ];

  togglePopup() {
    this.openPopup.update((prev) => !prev);
  }

  editArea(event: any) {
    this.selectedTableArea.set(event);
    this.togglePopup();
  }

  addArea(event: any) {
    this.areas = [...this.areas, event];
    this.togglePopup();
  }
}
