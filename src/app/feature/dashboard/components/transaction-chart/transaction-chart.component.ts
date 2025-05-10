import { Component, OnInit } from '@angular/core';
import { TransactionChartRowComponent } from "../transaction-chart-row/transaction-chart-row.component";
import { TransactionChartHeaderComponent } from "../transaction-chart-header/transaction-chart-header.component";

@Component({
  selector: 'transaction-chart-dashboard',
  templateUrl: './transaction-chart.component.html',
  imports: [TransactionChartRowComponent, TransactionChartHeaderComponent]
})

export class TransactionChartComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
