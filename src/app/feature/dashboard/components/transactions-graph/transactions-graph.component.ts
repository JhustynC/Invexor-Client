import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { TransactionsGraphService } from './services/transactions-graph.service';
import { TransactionStatistics } from './Dtos/transaction-statistics';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'transactions-graph-dashboard',
  templateUrl: './transactions-graph.component.html',
  imports: [BaseChartDirective],
  styles: `
    .chart-container {
      width: 100%;
      height: 100%;
      max-width: 10000px;
      max-height: 1000px;
      margin: auto;
      background: #D1D5DB;
      border-radius: 15px;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  `,
})
export class TransactionsGraphComponent {
  ngOnInit() {}

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    datasets: [
      {
        data: [3, 10, 20, 30, 25, 15, 8, 7, 10, 15, 25, 35],
        label: 'Transacciones',
        borderColor: 'rgba(96, 125, 255, 0.6)',
        // backgroundColor: 'rgba(96, 125, 255, 0.3)',
        pointBackgroundColor: '#000',
        pointRadius: 3,
        fill: true,
        tension: 0.4,
      },
      {
        data: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
        label: 'Tendencia',
        borderColor: 'rgba(255, 0, 0, 0.6)',
        backgroundColor: 'transparent',
        pointRadius: 0,
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      y: {
        beginAtZero: true,
        max: 40,
        ticks: {
          stepSize: 10,
        },
        grid: {
          color: '#ccc',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`,
        },
      },
    },
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
}
