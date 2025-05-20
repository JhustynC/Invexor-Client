import { Component, inject, OnInit } from '@angular/core';
//import { TransactionChartRowComponent } from "../transaction-chart-row/transaction-chart-row.component";
//import { TransactionChartHeaderComponent } from "../transaction-chart-header/transaction-chart-header.component";
import { TransactionChartRowComponent } from './components/transaction-chart-row/transaction-chart-row.component';
import { TransactionChartHeaderComponent } from './components/transaction-chart-header/transaction-chart-header.component';
//import { TransactionChartService } from '../../services/transaction-chart.service';
import { TransactionChartService } from './services/transaction-chart.service';
@Component({
  selector: 'last-transaction-chart-dashboard',
  standalone: true,
  templateUrl: './last-transaction-chart.component.html',
  styleUrl: './last-transaction-chart.component.css',
  imports: [TransactionChartRowComponent, TransactionChartHeaderComponent],
  providers: [TransactionChartService],
})
export class LastTransactionChartComponent implements OnInit {
  title = 'Last transactions';
  description = '';
  rows: any[] = [];

  transactionChartService = inject(TransactionChartService);

  constructor() {
    //this.title = transactionChartService.title
    //this.description = transactionChartService.description
    //this.rows = transactionChartService.rows
  }

  ngOnInit() {
    this.transactionChartService.getData().subscribe((data) => {
      this.title = data.title;
      this.description = data.description;
      this.rows = data.rows;
      //console.log(this.rows);
    });
  }
}
