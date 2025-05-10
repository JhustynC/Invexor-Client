import { Component, input } from '@angular/core';

@Component({
  selector: 'transaction-chart-row',
  imports: [],
  templateUrl: './transaction-chart-row.component.html',
  styleUrl: './transaction-chart-row.component.css'
})
export class TransactionChartRowComponent {
  date = input<string>();
  date_hour = input<string>();
  type = input<string>();
  id = input<string>();
  constructor(){

  }


}
