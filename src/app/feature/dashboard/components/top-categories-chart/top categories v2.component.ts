import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { TopCategoriesService, TopCategoriesData } from './services/top-categories.service';

@Component({
  selector: 'top-categories-dashboard',
  templateUrl: './top categories v2.component.html',
  imports: [CommonModule, BaseChartDirective],
})
export class TopCategoriesComponent implements OnInit {
  private topCategoriesService = inject(TopCategoriesService);
  
  ngOnInit() {
    this.loadItemsByType();
  }
  
  private loadItemsByType() {
    this.topCategoriesService.getItemsByType().subscribe({
      next: (data: TopCategoriesData) => {
        console.log('Component received items by type data:', data);
        this.updateChartData(data);
      },
      error: (error) => {
        console.error('Error loading items by type in component:', error);
        // Mantener datos por defecto en caso de error
      }
    });
  }
  
  private updateChartData(data: TopCategoriesData) {
    // Actualizar solo los datos del gráfico, manteniendo toda la configuración original
    this.barChartData = {
      ...this.barChartData,
      labels: data.labels,
      datasets: [
        {
          ...this.barChartData.datasets[0],
          data: data.data,
        }
      ]
    };
    
    // Actualizar escala X dinámicamente basada en el valor máximo
    const maxValue = Math.max(...data.data);
    const xAxisMax = maxValue > 0 ? Math.ceil(maxValue * 1.1) : 100;
    
    if (this.barChartOptions?.scales?.['x']) {
      (this.barChartOptions.scales['x'] as any).max = xAxisMax;
    }
  }
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
