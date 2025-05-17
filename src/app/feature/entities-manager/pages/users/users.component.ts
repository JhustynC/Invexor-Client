import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EnterImgComponent } from '../../../../shared/components/enter-img/enter-img.component';
import { SubListComponent } from '../../../../shared/components/sub-list/sub-list.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { JsonFormData } from '../../../../shared/interfaces/form.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [ModalComponent, JsonPipe],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent {
  showModal = signal<boolean>(false);
  modalValues = signal(undefined);

  onModalFormValues(event: any) {
    this.modalValues.set(event);
    this.onShowModal();
    console.log('Desde otro componente', event);
  }

  onShowModal() {
    this.showModal.update((prev) => !prev);
  }
}
