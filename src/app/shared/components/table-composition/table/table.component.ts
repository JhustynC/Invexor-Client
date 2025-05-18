import { TitleCasePipe } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'table-shared',
  templateUrl: './table.component.html',
  imports: [TitleCasePipe],
  styles: `

  @media (width <= 800px) {

    table thead{
      display: none;
    }

    table td{
      text-align: right;
      display: block;
      font-size: 1rem;
    }

    table tr td::before {
      content: attr(data-title) ': ';
      float: left;
      font-weight: bold;
    }

    tbody tr:nth-child(odd) {
      background-color: #293650;
    }
  }

  `,
})
export class TableComponent {
  columnNames = input<string[]>();
  data = input<any[]>();
  rowsPerPage = input<number>(5);
  currentPage = input<number>(1);
  selectedRow = output<any>();
}
