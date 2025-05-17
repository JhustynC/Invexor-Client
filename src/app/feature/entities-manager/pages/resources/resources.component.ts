import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicJsonFormComponent } from "../../../../shared/components/dynamic-json-form/dynamic-json-form.component";
import { EnterImgComponent } from "../../../../shared/components/enter-img/enter-img.component";
import { SubListComponent } from "../../../../shared/components/sub-list/sub-list.component";

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
