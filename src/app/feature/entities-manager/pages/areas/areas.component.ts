import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { JsonFormComponent } from '../../../../shared/components/json-form/json-form.component';

@Component({
  selector: 'areas-entites-manager',
  imports: [JsonFormComponent],
  templateUrl: './areas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AreasComponent {}
