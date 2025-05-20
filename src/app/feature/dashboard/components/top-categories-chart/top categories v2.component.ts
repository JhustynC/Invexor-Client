import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'top-categories-dashboard',
  templateUrl: './top categories v2.component.html',
  imports: [CommonModule, BaseChartDirective],
})
export class TopCategoriesComponent {
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`,
        },
      },
    },
    scales: {
      x: {
        display: false,
        max: 100,
      },
      y: {
        ticks: { color: '#000', font: { size: 15 } },
        grid: { display: true },
      },
    },
  };

  ngOnInit() {}

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Tec', 'Mer', 'Clo', 'Buy', 'Tec'],
    datasets: [
      {
        data: [89, 60, 85, 40, 89],
        label: 'Items',
        backgroundColor: ['#F97316'],
        borderRadius: 10, //? Valor en píxeles
        borderSkipped: false, //? Para aplicar el borde redondeado en todos los lados
      },
    ],
  };
}
