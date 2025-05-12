import { Component, input, OnInit, output } from '@angular/core';
import { SelectListComponent } from "./select-list/select-list.component";

@Component({
  selector: 'filterbar-shared',
  templateUrl: './table-top-section.componet.html',
  imports: [SelectListComponent],
})
export class TableTopSectionComponent implements OnInit {
  options = input<any[]>();
  emitFilterData = output<any[]>();

  constructor() {}

  ngOnInit() {}
}
