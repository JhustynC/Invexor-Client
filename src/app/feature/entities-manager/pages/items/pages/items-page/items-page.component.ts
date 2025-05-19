import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { TableCompositionComponent } from '../../../../../../shared/components/table-composition/table-composition.component';
import { ModalComponent } from '../../../../../../shared/components/modal/modal.component';
import { SubListComponent } from '../../../../../../shared/components/sub-list/sub-list.component';
import { EnterImgComponent } from '../../../../../../shared/components/enter-img/enter-img.component';
import { UpgratedFormComponent } from '../../../../../../shared/components/upgrated-form/upgrated-form.component';
import { LayoutService } from '../../../../../../layout/invexor-layout/services/layout.service';

@Component({
  selector: 'app-items-page',
  imports: [
    TableCompositionComponent,
    ModalComponent,
    SubListComponent,
    EnterImgComponent,
    UpgratedFormComponent,
  ],
  templateUrl: './items-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ItemsPageComponent {
  showCustomProperties = signal<boolean>(false);
  showModal = signal<boolean>(false);
  openPopup = signal<boolean>(false);
  showTable = true;
  modalValues = signal(undefined);
  selectedTableUser = signal<any>(undefined);

  cancelButtonInfoClicked = output<void>();
  showCancelButtonInfoClicked = input<void>();

  infoData: any[] = [];

  // atributos de custom properties o cargos
  atributes: string[] = [];

  //? Service to use with modal
  //! Evitar doble scroll
  layoutService = inject(LayoutService);

  onModalFormValues(event: any) {
    event['atributes'] = this.atributes;
    this.modalValues.set(event);
    //this.onShowModal();
    this.onCloseModal();
    //this.onShowTable();
    console.log('Desde otro componente', event);
    this.addUser(this.modalValues());
    console.log('Usuarios:', this.items);
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

  onShowInfo() {
    this.showCustomProperties.update((prev) => !prev);
    this.layoutService.bloquearScroll();
  }

  onCloseInfo() {
    this.showCustomProperties.update((prev) => !prev);
    this.layoutService.permitirScroll();
  }

  // Acciones de poup al editar un usuario
  togglePopup() {
    this.selectedTableUser.set(undefined);
    this.openPopup.update((prev) => !prev);
  }

  // Añade al usuario a la lista
  addUser(new_item: any) {
    //this.usuarios.push(new_user);
    this.items = [...this.items, new_item];
  }

  editUser(event: any) {
    this.selectedTableUser.set(event);
    this.openPopup.update((prev) => !prev);
  }

  infoUser(event: any) {
    //
    console.log('Usuario seleccionado', event);
    //console.log('Usuario seleccionado', );
    this.transformarObjeto(event);
    this.showCustomProperties.update((prev) => !prev);
  }

  updateUser(event: any) {
    //this.usuarios[this.usuarios.findIndex((usuario) => usuario.ID === event.ID)] = event;
    const index = this.items.findIndex((item) => item.SKU === event.sku);
    console.log('Indice del usuario seleccionado', index);
    if (index !== -1) {
      this.items[index] = event;
      this.items = [...this.items];
    }

    console.log(this.items);
    this.selectedTableUser.set(undefined);
    this.openPopup.update((prev) => !prev);
  }
  emitCancelButtonClicked() {
    this.cancelButtonInfoClicked.emit();
  }

  transformarObjeto(obj: any): any[] {
    const resultado: any[] = [];

    for (const clave in obj) {
      if (clave === 'attributes' && Array.isArray(obj[clave])) {
        obj[clave].forEach((valor: string, indice: number) => {
          resultado.push({
            ID: `Attribute ${indice + 1}`,
            Valor: valor,
            Fecha: '---',
          });
        });
      } else {
        resultado.push({
          ID: clave,
          Valor: String(obj[clave]),
          Fecha: '---',
        });
      }
    }
    console.log('Objeto transformado:', resultado);
    this.infoData = resultado;
    return resultado;
  }
  items = [
    { SKU: '001', Nombre: 'Item 1', Descripcion: 'Descripción del item 1' },
    { SKU: '002', Nombre: 'Item 2', Descripcion: 'Descripción del item 2' },
    { SKU: '003', Nombre: 'Item 3', Descripcion: 'Descripción del item 3' },
  ];
}
