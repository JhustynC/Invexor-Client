import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { EnterImgComponent } from '../../../../shared/components/enter-img/enter-img.component';
import { SubListComponent } from '../../../../shared/components/sub-list/sub-list.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { JsonFormData } from '../../../../shared/interfaces/form.interface';
import { JsonPipe } from '@angular/common';
import { TableCompositionComponent } from '../../../../shared/components/table-composition/table-composition.component';
import { UpgratedFormComponent } from '../../../../shared/components/upgrated-form/upgrated-form.component';
import { LayoutService } from '../../../../layout/invexor-layout/services/layout.service';

@Component({
  selector: 'app-users',
  imports: [
    ModalComponent,
    TableCompositionComponent,
    SubListComponent,
    EnterImgComponent,
    UpgratedFormComponent,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent {
  showModal = signal<boolean>(false);
  openPopup = signal<boolean>(false);
  showTable = true;
  modalValues = signal(undefined);
  selectedTableUser = signal<any>(undefined);

  // atributos de custom properties o cargos
  atributes: string[] = [];

  //? Service to use with modal
  //! Evitar doble scroll
  layoutService = inject(LayoutService);

  onModalFormValues(event: any) {
    event['atributes'] = this.atributes;
    this.modalValues.set(event);
    this.onShowModal();
    this.onShowTable();
    console.log('Desde otro componente', event);
    this.addUser(this.modalValues());
    console.log('Usuarios:', this.usuarios);
  }

  subListOptions(event: Set<string>) {
    this.atributes = [...event];
    console.log('Lista de opciones', event);
  }

  onEnterImg(event: string | ArrayBuffer | null) {
    console.log(event);
  }

  onShowTable() {
    this.showTable = !this.showTable;
  }

  onShowModal() {
    this.showModal.update((prev) => !prev);
    //? Bloqueo del scroll del layout
    this.layoutService.bloquearScroll();
  }

  onCloseModal() {
    this.showModal.update((prev) => !prev);
    //? Permitir scroll del layout
    this.layoutService.permitirScroll();
  }

  // Acciones de poup al editar un usuario
  togglePopup() {
    this.selectedTableUser.set(undefined);
    this.openPopup.update((prev) => !prev);
  }

  // Añade al usuario a la lista
  addUser(new_user: any) {
    //this.usuarios.push(new_user);
    this.usuarios = [...this.usuarios, new_user];
    this.openPopup.update((prev) => !prev);
  }

  editUser(event: any) {
    this.selectedTableUser.set(event);
    this.openPopup.update((prev) => !prev);
  }

  updateUser(event: any) {
    //this.usuarios[this.usuarios.findIndex((usuario) => usuario.ID === event.ID)] = event;
    const index = this.usuarios.findIndex((usuario) => usuario.ID === event.ID);
    console.log('Indice del usuario seleccionado', index);
    if (index !== -1) {
      this.usuarios[index] = event;
      this.usuarios = [...this.usuarios];
    }

    console.log(this.usuarios);
    this.selectedTableUser.set(undefined);
    this.openPopup.update((prev) => !prev);
  }

  usuarios = [
    {
      ID: 1,
      Nombre: 'Juan Pérez',
      Email: 'juan.perez@email.com',
      Activo: 'Sí',
    },
    {
      ID: 2,
      Nombre: 'María González',
      Email: 'maria.gonzalez@email.com',
      Activo: 'No',
    },
    {
      ID: 3,
      Nombre: 'Carlos Rodríguez',
      Email: 'carlos.rodriguez@email.com',
      Activo: 'Sí',
    },
    {
      ID: 4,
      Nombre: 'Ana Martínez',
      Email: 'ana.martinez@email.com',
      Activo: 'Sí',
    },
    {
      ID: 5,
      Nombre: 'Luis Fernández',
      Email: 'luis.fernandez@email.com',
      Activo: 'No',
    },
    {
      ID: 6,
      Nombre: 'Sofía López',
      Email: 'sofia.lopez@email.com',
      Activo: 'Sí',
    },
    {
      ID: 7,
      Nombre: 'Ricardo Jiménez',
      Email: 'ricardo.jimenez@email.com',
      Activo: 'No',
    },
    {
      ID: 8,
      Nombre: 'Valeria Ortiz',
      Email: 'valeria.ortiz@email.com',
      Activo: 'Sí',
    },
    {
      ID: 9,
      Nombre: 'Fernando Castro',
      Email: 'fernando.castro@email.com',
      Activo: 'Sí',
    },
    {
      ID: 10,
      Nombre: 'Patricia Rivas',
      Email: 'patricia.rivas@email.com',
      Activo: 'No',
    },
    {
      ID: 11,
      Nombre: 'Gabriel Muñoz',
      Email: 'gabriel.munoz@email.com',
      Activo: 'Sí',
    },
    {
      ID: 12,
      Nombre: 'Andrea Silva',
      Email: 'andrea.silva@email.com',
      Activo: 'Sí',
    },
    {
      ID: 13,
      Nombre: 'Diego Vargas',
      Email: 'diego.vargas@email.com',
      Activo: 'No',
    },
    {
      ID: 14,
      Nombre: 'Lorena Castillo',
      Email: 'lorena.castillo@email.com',
      Activo: 'Sí',
    },
    {
      ID: 15,
      Nombre: 'Héctor Navarro',
      Email: 'hector.navarro@email.com',
      Activo: 'No',
    },
    {
      ID: 16,
      Nombre: 'Camila Herrera',
      Email: 'camila.herrera@email.com',
      Activo: 'Sí',
    },
    {
      ID: 17,
      Nombre: 'Marco Salazar',
      Email: 'marco.salazar@email.com',
      Activo: 'Sí',
    },
    {
      ID: 18,
      Nombre: 'Isabel Fuentes',
      Email: 'isabel.fuentes@email.com',
      Activo: 'No',
    },
    {
      ID: 19,
      Nombre: 'Rodrigo Mendoza',
      Email: 'rodrigo.mendoza@email.com',
      Activo: 'Sí',
    },
    {
      ID: 20,
      Nombre: 'Cristina Paredes',
      Email: 'cristina.paredes@email.com',
      Activo: 'Sí',
    },
    {
      ID: 21,
      Nombre: 'Cristina Paredes',
      Email: 'cristina.paredes@email.com',
      Activo: 'Sí',
      Ciudad: 'Cuenca',
    },
  ];
  constructor(private cdr: ChangeDetectorRef) {}
}
