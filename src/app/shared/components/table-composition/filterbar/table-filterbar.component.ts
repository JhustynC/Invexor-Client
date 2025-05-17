import { Component, input, OnInit, output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'table-filterbar',
  templateUrl: './table-filterbar.component.html',
  imports: [TitleCasePipe],
})
export class TableFilterbarComponent implements OnInit {
  columnNames = input<string[]>();
  sortField = input<string | null>(null);
  sortDirection = input<string>();

  onSearchOutput = output<string>();
  onSortChangeOutput = output<string>();
  sortDirectionOutput = output<string>();

  constructor() {}

  ngOnInit() {}

  onSearch(event: any) {
    this.onSearchOutput.emit(event);
  }

  onSortChange(event: any) {
    this.onSortChangeOutput.emit(event);
  }

  toggleSortDirection() {
    this.sortDirectionOutput.emit(
      this.sortDirection() === 'asc' ? 'desc' : 'asc'
    );
  }
}
