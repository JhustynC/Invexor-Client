import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { JsonFormComponent } from '../../../../shared/components/json-form/json-form.component';
import { TableCompositionComponent } from '../../../../shared/components/table-composition/table-composition.component';
import { UpgratedFormComponent } from '../../../../shared/components/upgrated-form/upgrated-form.component';
import { LayoutService } from '../../../../layout/invexor-layout/services/layout.service';

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
  openCustomProperties = signal<boolean>(false);

  layoutService = inject(LayoutService);

  ngOnDestroy() {
    this.layoutService.permitirScroll();
  }

  areas = [
    { id: "A1", sucursal: "Sucursal A", padre: "Area PA", nombre: "Area A", telefono: "07-1234567", estado: "Activa", description: "Area de ventas" },
    { id: "A2", sucursal: "Sucursal B", padre: "Area PB", nombre: "Area B", telefono: "02-7654321", estado: "Inactiva", description: "Area de compras" },
    { id: "A3", sucursal: "Sucursal C", padre: "Area PC", nombre: "Area C", telefono: "04-9876543", estado: "Activa", description: "Area de soporte" },
    { id: "A4", sucursal: "Sucursal D", padre: "Area PD", nombre: "Area D", telefono: "07-1112233", estado: "Activa", description: "Area de marketing" },
    { id: "A5", sucursal: "Sucursal E", padre: "Area PE", nombre: "Area E", telefono: "03-3344556", estado: "Inactiva", description: "Area de recursos humanos" },
    { id: "A6", sucursal: "Sucursal F", padre: "Area PF", nombre: "Area F", telefono: "03-9988776", estado: "Activa", description: "Area de finanzas" },
    { id: "A7", sucursal: "Sucursal G", padre: "Area PG", nombre: "Area G", telefono: "05-2233445", estado: "Activa", description: "Area de IT" },
    { id: "A8", sucursal: "Sucursal H", padre: "Area PH", nombre: "Area H", telefono: "06-6677889", estado: "Inactiva", description: "Area de legal" },
    { id: "A9", sucursal: "Sucursal I", padre: "Area PI", nombre: "Area I", telefono: "06-5544332", estado: "Activa", description: "Area de logística" },
    { id: "A10", sucursal: "Sucursal J", padre: "Area Otra", nombre: "Area J", telefono: "06-3344556", estado: "Activa", description: "Area de ventas" },
    { id: "A11", sucursal: "Sucursal K", padre: "Area Otra", nombre: "Area K", telefono: "07-2233445", estado: "Activa", description: "Area de compras" },
    { id: "A12", sucursal: "Sucursal L", padre: "Area Otra", nombre: "Area L", telefono: "02-1234567", estado: "Inactiva", description: "Area de atención al cliente" },
    { id: "A13", sucursal: "Sucursal M", padre: "Area Otra", nombre: "Area M", telefono: "04-2233445", estado: "Activa", description: "Area de investigación" },
    { id: "A14", sucursal: "Sucursal N", padre: "Area Otra", nombre: "Area N", telefono: "07-9988776", estado: "Activa", description: "Area de desarrollo" },
    { id: "A15", sucursal: "Sucursal O", padre: "Area Otra", nombre: "Area O", telefono: "03-5544332", estado: "Inactiva", description: "Area de recursos humanos" },
    { id: "A16", sucursal: "Sucursal P", padre: "Area Otra", nombre: "Area P", telefono: "05-3344556", estado: "Activa", description: "Area de marketing" },
    { id: "A17", sucursal: "Sucursal Q", padre: "Area Otra", nombre: "Area Q", telefono: "06-4455667", estado: "Activa", description: "Area de ventas" }
  ];

  editArea(event: any) {
    this.selectedTableArea.set(event);
    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  addArea(event: any) {
    this.areas = [...this.areas, event];
    console.log(this.areas);
    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  updateArea(event: any) {
    const idx = this.areas.findIndex((area) => area.id === event.id);
    if (idx !== -1) {
      this.areas[idx] = event;
      this.areas = [...this.areas]; // <-- This triggers Angular to refresh the view
    }
    console.log(this.areas);
    this.selectedTableArea.set(undefined);
    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  togglePopup() {
    this.selectedTableArea.set(undefined);
    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  selectedOptions(event: any) {
    console.log(event);
  }

  toggleCustomProperties() {
    this.openCustomProperties.update((prev) => !prev);
    this.openCustomProperties() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }
}
