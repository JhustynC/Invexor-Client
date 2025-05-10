import { Component, OnInit } from '@angular/core';
import { TransactionChartRowComponent } from "../transaction-chart-row/transaction-chart-row.component";
import { TransactionChartHeaderComponent } from "../transaction-chart-header/transaction-chart-header.component";
import { TransactionChartService } from '../../services/transaction-chart.service';

@Component({
  selector: 'transaction-chart-dashboard',
  templateUrl: './transaction-chart.component.html',
  imports: [TransactionChartRowComponent, TransactionChartHeaderComponent]
})

export class TransactionChartComponent implements OnInit {

  title = '';
  description = '';
  rows: any[] = [];

  constructor(public transactionChartService: TransactionChartService) {
    this.title = transactionChartService.title
    this.description = transactionChartService.description
    this.rows = transactionChartService.rows
   }

  ngOnInit() { }
}
