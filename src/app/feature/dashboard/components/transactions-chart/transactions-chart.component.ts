import { Component, OnInit, inject } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { TransactionsGraphService } from './services/transactions-graph.service';
import { TransactionStatistics } from './Dtos/transaction-statistics';
import { BaseChartDirective } from 'ng2-charts';

//? Solucion para el responsive en el dashboard: estilos del chart-container
@Component({
  selector: 'transactions-chart-dashboard',
  templateUrl: './transactions-chart.component.html',
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
export class TransactionsChartComponent implements OnInit {
  private transactionsService = inject(TransactionsGraphService);
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  }

  ngOnInit() {
    this.loadTransactionData();
  }

  private loadTransactionData() {
    // Cargar datos por mes del año actual por defecto
    this.transactionsService.getTransactionStatistics('month', new Date().getFullYear())
      .subscribe({
        next: (data: TransactionStatistics) => {
          console.log('Component received data:', data);
          if (data && data.x && data.y && data.y[0]) {
            this.updateChartData(data);
          } else {
            console.warn('Invalid data structure, using fallback');
            this.loadFallbackData();
          }
        },
        error: (error) => {
          console.error('Error loading transaction data:', error);
          this.loadFallbackData();
        }
      });
  }

  private loadFallbackData() {
    // Datos de fallback con estructura básica
    const fallbackData: TransactionStatistics = {
      x: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      y: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] // Datos vacíos
    };
    this.updateChartData(fallbackData);
  }

  private updateChartData(data: TransactionStatistics) {
    console.log('Updating chart with data:', data);

    const transactionData = data.y[0] || [];
    
    // Crear configuración base para las transacciones
    const baseDataset = {
      data: transactionData,
      label: 'Transacciones',
      borderColor: 'rgba(96, 125, 255, 0.6)',
      backgroundColor: 'rgba(96, 125, 255, 0.1)',
      pointBackgroundColor: '#000',
      pointRadius: 3,
      fill: true,
      tension: 0.4,
    };
    
    // Calcular línea de tendencia
    const trendData = this.calculateTrendLine(transactionData);
    const trendDataset = {
      data: trendData,
      label: 'Tendencia',
      borderColor: 'rgba(255, 0, 0, 0.6)',
      backgroundColor: 'transparent',
      pointRadius: 0,
      borderDash: [5, 5],
      fill: false,
      tension: 0,
    };

    // Actualizar solo los datos del gráfico, manteniendo el estilo original
    this.lineChartData = {
      labels: data.x || [],
      datasets: [baseDataset, trendDataset],
    };

    // Actualizar escala Y dinámicamente
    const maxValue = Math.max(...(data.y[0] || [0]));
    // Usar el valor máximo + un pequeño margen, o mínimo 5 si todos los valores son 0
    const yAxisMax = maxValue > 0 ? Math.ceil(maxValue + (maxValue * 0.1)) : 5;

    // Actualizar solo la escala máxima manteniendo la configuración original
    if (this.lineChartOptions?.scales?.['y']) {
      (this.lineChartOptions.scales['y'] as any).max = yAxisMax;
      if ((this.lineChartOptions.scales['y'] as any).ticks) {
        (this.lineChartOptions.scales['y'] as any).ticks.stepSize = Math.ceil(yAxisMax / 4);
      }
    }
  }
  
  private calculateTrendLine(data: number[]): number[] {
    if (data.length === 0) return [];
    
    const n = data.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    
    // Calcular sumas para regresión lineal
    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += data[i];
      sumXY += i * data[i];
      sumXX += i * i;
    }
    
    // Calcular pendiente (m) e intercepto (b) de la línea y = mx + b
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Generar puntos de la línea de tendencia
    const trendLine: number[] = [];
    for (let i = 0; i < n; i++) {
      trendLine.push(slope * i + intercept);
    }
    
    return trendLine;
  }

  // public lineChartData: ChartConfiguration<'line'>['data'] = {
  //   labels: [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Ago',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dic',
  //   ],
  //   datasets: [
  //     {
  //       data: [3, 10, 20, 30, 25, 15, 8, 7, 10, 15, 25, 35],
  //       label: 'Transacciones',
  //       borderColor: 'rgba(96, 125, 255, 0.6)',
  //       // backgroundColor: 'rgba(96, 125, 255, 0.3)',
  //       pointBackgroundColor: '#000',
  //       pointRadius: 3,
  //       fill: true,
  //       tension: 0.4,
  //     },
  //     {
  //       data: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  //       label: 'Tendencia',
  //       borderColor: 'rgba(255, 0, 0, 0.6)',
  //       backgroundColor: 'transparent',
  //       pointRadius: 0,
  //       borderDash: [5, 5],
  //       fill: false,
  //     },
  //   ],
  // };

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
