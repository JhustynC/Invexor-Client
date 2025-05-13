import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JsonFormData } from '../../../interfaces/form.interface';

@Component({
  selector: 'app-json-form',
  imports: [],
  templateUrl: './json-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent {
  jsonFormData = input<JsonFormData>();

  

}
