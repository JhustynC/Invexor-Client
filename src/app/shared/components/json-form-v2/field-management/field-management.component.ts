// field-management.component.ts
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormControl, FormControlType } from '../jsonFormDataV2.interface';


@Component({
  selector: 'field-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-management.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldManagementComponent {


}
