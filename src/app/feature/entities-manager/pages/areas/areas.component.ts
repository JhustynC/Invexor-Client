import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { TableCompositionComponent } from '../../../../shared/components/table-composition/table-composition.component';
import { UpgratedFormComponent } from '../../../../shared/components/upgrated-form/upgrated-form.component';
import { LayoutService } from '../../../../layout/invexor-layout/services/layout.service';
import { AreaService } from '../../services/area.service';
import { AreaDto } from '../../interfaces/area.dto';
import { EntityService } from '../../services/entity.service';

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

  constructor(
    private readonly areaService: AreaService,
    private readonly entityService: EntityService
  ) {
    // effect(() => {
    //   if (!this.openPopup()) {
    //     this.getAllAreas();
    //   }
    // });
  }

  ngOnDestroy() {
    this.layoutService.permitirScroll();
  }

  areas: any[] = [];

  ngOnInit() {
    this.getAllAreas();
  }

  getAllAreas() {
    this.areaService.getAllAreas().subscribe({
      next: (data) => {
        console.log('Areas fetched successfully:', data);
        this.areas = data.map((area) => ({
          area_id: area.area_id,
          branch_id: area.branch_id,
          pattern_area_id: area.pattern_area_id,
          areaname: area.areaname,
          phone: area.phone,
          active: area.active ? 'Activa' : 'Inactiva',
          description: area.description,
          id_entity: area.id_entity,
        }));
      },
      error: (error) => {
        console.error('Error fetching areas:', error);
      }
    });
  }

  editArea(event: any) {
    this.selectedTableArea.set(event);
    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  addArea(event: any) {
    this.entityService.createEntity({entity_type: 2}).subscribe({
      next: (createdEntity) => {
        this.saveArea(event, createdEntity.id_entity);
      },
      error: (error) => {
        console.error('Error creating entity:', error);
        // You might want to show an error message to the user here
      }
    });
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

  saveArea(area: any, entity_id: number) {
    // Transform the form data to match the AreaDto interface
    const newArea: AreaDto = {
      area_id: area.area_id,
      branch_id: area.branch_id,
      pattern_area_id: area.pattern_area_id === '' ? area.area_id : area.pattern_area_id,
      areaname: area.areaname,
      phone: area.phone,
      active: area.active === 'Activa', // Convert string to boolean
      description: area.description,
      id_entity: entity_id // You might want to make this dynamic
    };
    // Call the service to create the area
    this.areaService.createArea(newArea).subscribe({
      next: (createdArea) => {

        // Add the new area to the local array with the display format
        this.getAllAreas();
        console.log('Updated areas:', this.areas);
      },
      error: (error) => {
        console.error('Error creating area:', error);
        // You might want to show an error message to the user here
      }
    });
  }
}
