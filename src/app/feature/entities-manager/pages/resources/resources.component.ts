import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicJsonFormComponent } from "../../../../shared/components/dynamic-json-form/dynamic-json-form.component";

@Component({
  selector: 'app-resources',
  imports: [DynamicJsonFormComponent],
  templateUrl: './resources.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResourcesComponent { }
