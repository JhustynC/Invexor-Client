import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EnterImgComponent } from '../../../../shared/components/enter-img/enter-img.component';
import { SubListComponent } from '../../../../shared/components/sub-list/sub-list.component';

@Component({
  selector: 'app-users',
  imports: [EnterImgComponent, SubListComponent],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent {
  subListOptions(event: Set<string>) {
    console.log(event);
  }

  onEnterImg(event: string | ArrayBuffer | null) {
    console.log(event);
  }
}
