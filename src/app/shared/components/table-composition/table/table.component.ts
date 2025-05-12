import { TitleCasePipe } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'table-shared',
  templateUrl: './table.component.html',
  imports: [TitleCasePipe],
})
export class TableComponent {
  columnNames = input<string[]>();
  data = input<any[]>();
  rowsPerPage = input<number>(5);
  currentPage = input<number>(1);
}
