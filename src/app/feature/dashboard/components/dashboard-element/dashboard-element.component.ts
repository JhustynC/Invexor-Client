import { Component } from '@angular/core';
import { TransactionChartComponent } from "../transaction-chart/transaction-chart.component";

@Component({
  selector: 'app-dashboard-element',
  imports: [TransactionChartComponent],
  templateUrl: './dashboard-element.component.html',
  styleUrl: './dashboard-element.component.css'
})
export class DashboardElementComponent {

}
