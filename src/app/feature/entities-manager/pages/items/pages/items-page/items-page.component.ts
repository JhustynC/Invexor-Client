import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-items-page',
  imports: [],
  templateUrl: './items-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ItemsPageComponent {}
