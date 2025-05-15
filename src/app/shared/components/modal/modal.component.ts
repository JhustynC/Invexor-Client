import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { JsonFormComponent } from '../json-form/json-form.component';
import { JsonFormData } from '../../interfaces/form.interface';

@Component({
  selector: 'modal-form',
  imports: [JsonFormComponent],
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
  :host{
    position: relative
  }
  `,
})
export class ModalComponent {
  jsonFormDataUrl = input<string>();
  showCancelButton = input<boolean>(false);

  cancelButtonOutput = output<void>();
  modalFormValues = output<any>();

  onSubmit(event: any) {
    this.modalFormValues.emit(event);
  }

  onCancelButton() {
    this.cancelButtonOutput.emit();
  }
}
