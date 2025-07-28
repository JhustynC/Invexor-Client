import { Component, inject, signal } from '@angular/core';
import { TableCompositionComponent } from '../../../../shared/components/table-composition/table-composition.component';
import { UpgratedFormComponent } from '../../../../shared/components/upgrated-form/upgrated-form.component';
import { LayoutService } from '../../../../layout/invexor-layout/services/layout.service';
import { BranchService } from '../../services/branch.service';
import { BranchDto, UpdateBranchDto } from '../../interfaces/branch.dto';
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
    this.getAllBranches();
  }

  getAllBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (data) => {
        this.sucursales = data.map((branch) => ({
          id_branch: branch.id_branch,
          name_branch: branch.name_branch,
          city: branch.city,
          phone: branch.phone,
          state: branch.state ? 'Activa' : 'Inactiva',
          id_entity: branch.id_entity
        }));
      },
      error: (error) => {
        console.error('Error fetching branches:', error);
      },
    });
  }

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

        // Add the new branch to the local array with the display format
        this.getAllBranches();
        console.log('Updated sucursales:', this.sucursales);
      },
      error: (error) => {
        console.error('Error creating branch:', error);
        // You might want to show an error message to the user here
      }
    });
  }

  updateBranch(event: any) {
    const updatedBranch: UpdateBranchDto = {
      id_branch: event.id_branch,
      name_branch: event.name_branch,
      city: event.city,
      phone: event.phone,
      state: event.state === 'Activa', // Convert string to boolean
      id_entity: event.id_entity // You might want to make this dynamic
    };
    this.branchService.updateBranch(event.id_branch, updatedBranch).subscribe({
      next: (updatedBranch) => {

        // Update the local array with the updated branch
        this.getAllBranches();
      },
      error: (error) => {
        console.error('Error updating branch:', error);
        // You might want to show an error message to the user here
      }
    });
    
    this.selectedTableBranch.set(undefined);
    this.openPopup.update((prev) => !prev);
    this.openPopup() ? this.layoutService.bloquearScroll() : this.layoutService.permitirScroll();
  }

  deleteBranch(event: any) {
    console.log('Deleting branch:', event);
    this.branchService.deleteBranch(event.id_branch).subscribe({
      next: () => {
        // Remove the branch from the local array
        this.getAllBranches();
      },
      error: (error) => {
        console.error('Error deleting branch:', error);
        // You might want to show an error message to the user here
      }
    })
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
}
