import { Component, input } from '@angular/core';

@Component({
  selector: 'app-transaction-chart-header',
  standalone: true,
  imports: [],
  templateUrl: './transaction-chart-header.component.html',
  styleUrl: './transaction-chart-header.component.css'
})
export class TransactionChartHeaderComponent {

  title = input<string>();
  description = input<string>();
  constructor() {
  }
}
