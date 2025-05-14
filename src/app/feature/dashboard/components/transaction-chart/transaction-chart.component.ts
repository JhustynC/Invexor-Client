import { Component, inject, OnInit } from '@angular/core';
//import { TransactionChartRowComponent } from "../transaction-chart-row/transaction-chart-row.component";
//import { TransactionChartHeaderComponent } from "../transaction-chart-header/transaction-chart-header.component";
import { TransactionChartRowComponent } from './components/transaction-chart-row/transaction-chart-row.component';
import { TransactionChartHeaderComponent } from './components/transaction-chart-header/transaction-chart-header.component';
//import { TransactionChartService } from '../../services/transaction-chart.service';
import { TransactionChartService } from './services/transaction-chart.service';
@Component({
  selector: 'transaction-chart-dashboard',
  standalone: true,
  templateUrl: './transaction-chart.component.html',
  imports: [TransactionChartRowComponent, TransactionChartHeaderComponent],
  providers: [TransactionChartService],
})
export class TransactionChartComponent implements OnInit {
  title = '';
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
      console.log(this.rows);
    });
  }
}
