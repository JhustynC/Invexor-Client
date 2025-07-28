import { Component, inject, signal } from '@angular/core';
import { TableCompositionComponent } from '../../../../shared/components/table-composition/table-composition.component';
import { UpgratedFormComponent } from '../../../../shared/components/upgrated-form/upgrated-form.component';
import { LayoutService } from '../../../../layout/invexor-layout/services/layout.service';
import { BranchService } from '../../services/branch.service';
import { BranchDto } from '../../interfaces/branch.dto';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'branchs-entities-manager',
  imports: [TableCompositionComponent, UpgratedFormComponent],
  templateUrl: './branchs.component.html',
  styleUrls: ['./branchs.component.css'],
})
export default class BranchsComponent{

  openPopup = signal<boolean>(false);
  openCustomProperties = signal<boolean>(false);
  formData = signal<any>(undefined);
  selectedTableBranch = signal<any>(undefined);
  layoutService = inject(LayoutService);

  sucursales: any[] = [];

  constructor(
    private readonly branchService: BranchService,
    private readonly entityService: EntityService,
  ) {}

  ngOnDestroy() {
    this.layoutService.permitirScroll();
  }

  ngOnInit() {
    this.branchService.getAllBranches().subscribe({
      next: (data) => {
        this.sucursales = data.map((branch) => ({
          id_branch: branch.id_branch,
          name_branch: branch.name_branch,
          city: branch.city,
          phone: branch.phone,
          state: branch.state ? 'Activa' : 'Inactiva',
        }));
      },
      error: (error) => {
        console.error('Error fetching branches:', error);
      },
    });
  }

  // sucursales = [
  //   {
  //     id: 1,
  //     nombre: 'Sucursal A',
  //     ciudad: 'Cuenca',
  //     telefono: '07-1234567',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Sucursal B',
  //     ciudad: 'Quito',
  //     telefono: '02-7654321',
  //     estado: 'Inactiva',
  //   },
  //   {
  //     id: 3,
  //     nombre: 'Sucursal C',
  //     ciudad: 'Guayaquil',
  //     telefono: '04-9876543',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 4,
  //     nombre: 'Sucursal D',
  //     ciudad: 'Loja',
  //     telefono: '07-1112233',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 5,
  //     nombre: 'Sucursal E',
  //     ciudad: 'Ambato',
  //     telefono: '03-3344556',
  //     estado: 'Inactiva',
  //   },
  //   {
  //     id: 6,
  //     nombre: 'Sucursal F',
  //     ciudad: 'Riobamba',
  //     telefono: '03-9988776',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 7,
  //     nombre: 'Sucursal G',
  //     ciudad: 'Manta',
  //     telefono: '05-2233445',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 8,
  //     nombre: 'Sucursal H',
  //     ciudad: 'Esmeraldas',
  //     telefono: '06-6677889',
  //     estado: 'Inactiva',
  //   },
  //   {
  //     id: 9,
  //     nombre: 'Sucursal I',
  //     ciudad: 'Tena',
  //     telefono: '06-5544332',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 10,
  //     nombre: 'Sucursal J',
  //     ciudad: 'Ibarra',
  //     telefono: '06-3344556',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 11,
  //     nombre: 'Sucursal A',
  //     ciudad: 'Cuenca',
  //     telefono: '07-1234566',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 12,
  //     nombre: 'Sucursal B',
  //     ciudad: 'Quito',
  //     telefono: '02-7654321',
  //     estado: 'Inactiva',
  //   },
  //   {
  //     id: 13,
  //     nombre: 'Sucursal C',
  //     ciudad: 'Guayaquil',
  //     telefono: '04-9876543',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 14,
  //     nombre: 'Sucursal D',
  //     ciudad: 'Loja',
  //     telefono: '07-1112233',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 15,
  //     nombre: 'Sucursal E',
  //     ciudad: 'Ambato',
  //     telefono: '03-3344556',
  //     estado: 'Inactiva',
  //   },
  //   {
  //     id: 16,
  //     nombre: 'Sucursal F',
  //     ciudad: 'Riobamba',
  //     telefono: '03-9988776',
  //     estado: 'Activa',
  //   },
  //   {
  //     id: 17,
  //     nombre: 'Sucursal G',
  //     ciudad: 'Manta',
  //     telefono: '05-2233445',
  //     estado: 'Activa',
  //   }
  // ];

  editBranch(event: any) {
    
    this.selectedTableBranch.set(event);
    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  addBranch(event: any) {
    

    this.entityService.createEntity({entity_type: 1}).subscribe({
      next: (createdEntity) => {
        this.saveBranch(event, createdEntity.id_entity);
      },
      error: (error) => {
        console.error('Error creating entity:', error);
        // You might want to show an error message to the user here
      }
    });

    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }
  
  saveBranch(branch: any, entity_id: number) {
    // Transform the form data to match the BranchDto interface
    const newBranch: BranchDto = {
      id_branch: branch.id_branch,
      name_branch: branch.name_branch,
      city: branch.city,
      phone: branch.phone,
      state: branch.state === 'Activa', // Convert string to boolean
      id_entity: entity_id // You might want to make this dynamic
    };
    // Call the service to create the branch
    this.branchService.createBranch(newBranch).subscribe({
      next: (createdBranch) => {
        console.log('Branch created successfully:', createdBranch);
        // Add the new branch to the local array with the display format
        const displayBranch = {
          id_branch: createdBranch.id_branch,
          name_branch: createdBranch.name_branch,
          city: createdBranch.city,
          phone: createdBranch.phone,
          state: createdBranch.state ? 'Activa' : 'Inactiva',
        };
        this.sucursales = [...this.sucursales, displayBranch];
        console.log('Updated sucursales:', this.sucursales);
      },
      error: (error) => {
        console.error('Error creating branch:', error);
        // You might want to show an error message to the user here
      }
    });
  }

  updateBranch(event: any) {
    const idx = this.sucursales.findIndex((branch) => branch.id === event.id);
    if (idx !== -1) {
      this.sucursales[idx] = event;
      this.sucursales = [...this.sucursales]; // <-- This triggers Angular to refresh the view
    }
    console.log(this.sucursales);
    this.selectedTableBranch.set(undefined);
    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  togglePopup() {
    
    this.selectedTableBranch.set(undefined);
    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  toggleCustomProperties() {
    this.openCustomProperties.update((prev) => !prev);
    this.openCustomProperties() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  addPatternEntity(newBranch: BranchDto) {
    this.entityService.createEntity({entity_type: 1}).subscribe({
      next: (createdEntity) => {
        
      },
      error: (error) => {
        console.error('Error creating entity:', error);
        // You might want to show an error message to the user here
      }
    });
  }
}
