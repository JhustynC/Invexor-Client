import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { TransactionsGraphService } from "./services/transactions-graph.service";
import { TransactionStatistics } from "./Dtos/transaction-statistics";

@Component({
    selector: 'transactions-graph-dashboard',
    templateUrl: './transactions-graph.component.html',
    standalone: true
})
export class TransactionsGraphComponent implements OnInit {

    @ViewChild('myChart', {static: true}) chartRef!: ElementRef<HTMLCanvasElement>;
    xValues: string[] = [];
    yValues: number[][] = [];

    chart: Chart | undefined;

    constructor(private transactionsGraphService: TransactionsGraphService) {
        // Register all necessary Chart.js components
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.transactionsGraphService.gettransactionStatisticsByMonth().subscribe({
            next: (data:TransactionStatistics) => {
                this.xValues = data.x,
                this.yValues = data.y

                const chartConfig = this.chartConfig();
                
                if (this.chart) this.chart.destroy();
                // Initialize the chart
                this.chart = new Chart(this.chartRef.nativeElement, chartConfig);
            },
            error: () => {
                console.error('Error fetching transaction statistics');
            }
        });
        
    }

    chartConfig(): ChartConfiguration<'line'> {
        return {
            type: 'line',
            data: {
                labels: this.xValues,
                datasets: this.yValues.map((yValue) => ({
                    data: yValue,
                    borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false, // Show legend
                    },
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        };
    }
}