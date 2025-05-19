import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DynamicJsonFormComponent } from '../../../../shared/components/dynamic-json-form/dynamic-json-form.component';
import { EnterImgComponent } from '../../../../shared/components/enter-img/enter-img.component';
import { SubListComponent } from '../../../../shared/components/sub-list/sub-list.component';
import { TableCompositionComponent } from '../../../../shared/components/table-composition/table-composition.component';
import { UpgratedFormComponent } from '../../../../shared/components/upgrated-form/upgrated-form.component';
import { LayoutService } from '../../../../layout/invexor-layout/services/layout.service';

@Component({
  selector: 'app-resources',
  imports: [SubListComponent, TableCompositionComponent, UpgratedFormComponent],
  templateUrl: './resources.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResourcesComponent {
  openPopup = signal<boolean>(false);
  formData = signal<any>(undefined);
  selectedTableResource = signal<any>(undefined);

  layoutService = inject(LayoutService);

  ngOnDestroy() {
    this.layoutService.permitirScroll();
  }

  resources = [
    {
      id: 1,
      tipo: 'Agua',
      medida: 'Litros',
      moneda: '$',
      descripcion: 'Piso de de rrhh',
    },
    {
      id: 2,
      tipo: 'Electricidad',
      medida: 'Kilovatios',
      moneda: '€',
      descripcion: 'Piso de contabilidad',
    },
    {
      id: 3,
      tipo: 'Internet',
      medida: 'Mbps',
      moneda: '£',
      descripcion: 'Piso de sistemas',
    },
  ];

  editResource(event: any) {
    this.selectedTableResource.set(event);
    this.openPopup.update((prev) => !prev);
  }

  addResource(event: any) {
    this.resources = [...this.resources, event];
    console.log(this.resources);
    this.openPopup.update((prev) => !prev);
  }

  updateResource(event: any) {
    const idx = this.resources.findIndex(
      (resource) => resource.id === event.id
    );
    if (idx !== -1) {
      this.resources[idx] = event;
      this.resources = [...this.resources]; // <-- This triggers Angular to refresh the view
    }
    console.log(this.resources);
    this.selectedTableResource.set(undefined);
    this.openPopup.update((prev) => !prev);
  }

  togglePopup() {
    this.selectedTableResource.set(undefined);
    this.openPopup.update((prev) => !prev);
  }

  subListOptions(event: Set<string>) {
    console.log(event);
  }

  /* subListOptions(event: Set<string>) {
    console.log(event);
  }

  onEnterImg(event: string | ArrayBuffer | null) {
    console.log(event);
  } */
}
