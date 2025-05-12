import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'select-list-shared',
  imports: [],
  templateUrl: './select-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectListComponent {
  options = input<string[]>();
  messageOptions = input<string>("Select an option");
}
