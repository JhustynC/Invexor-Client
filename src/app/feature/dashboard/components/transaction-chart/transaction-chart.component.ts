import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { Subscription } from 'rxjs';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'transaction-chart-dashboard',
  templateUrl: './transaction-chart.component.html'
})

export class TransactionChartComponent implements OnInit {
  
  @ViewChild('myChart', {static: true}) chartRef!: ElementRef<HTMLCanvasElement>;

  constructor() {
    // Register all necessary Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {

    const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: 'red',
            borderWidth: 2,
            tension: 0.4, // Smooth curve
            fill: false,
          },
          {
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: 'green',
            borderWidth: 2,
            tension: 0.4, // Smooth curve
            fill: false,
          },
          {
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: 'blue',
            borderWidth: 2,
            tension: 0.4, // Smooth curve
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true, // Show legend
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Initialize the chart
    new Chart(this.chartRef.nativeElement, chartConfig);
  
  }
  
}
