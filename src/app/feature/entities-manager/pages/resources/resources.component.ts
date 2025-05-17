import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SubListComponent } from '../../../../shared/components/sub-list/sub-list.component';
import { EnterImgComponent } from '../../../../shared/components/enter-img/enter-img.component';

@Component({
  selector: 'app-resources',
  imports: [EnterImgComponent, SubListComponent],
  templateUrl: './resources.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResourcesComponent {
  subListOptions(event: Set<string>) {
    console.log(event);
  }

  onEnterImg(event: string | ArrayBuffer | null) {
    console.log(event);
  }
}
