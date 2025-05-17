import { Component, ElementRef, input, OnInit, ViewChild } from "@angular/core";
import { Chart, ChartConfiguration, registerables } from "chart.js";

@Component({
    selector: 'top-categories-row',
    templateUrl: './top-categories-row.html',
    standalone: true
})
export class TopCategoriesRowComponent implements OnInit {
    category = input.required<string>();
    maxValue = input.required<number>();
    value = input.required<number>();

    @ViewChild('myChart', {static: true}) chartRef!: ElementRef<HTMLCanvasElement>;
    chart: Chart | undefined;

    constructor() {

        Chart.register(...registerables);
    }

    ngOnInit(): void {
        
        this.chart = new Chart(this.chartRef.nativeElement, this.chartConfig());
    }

    chartConfig(): ChartConfiguration<'bar'> {

        return {
            type: 'bar',
            data: {
                labels: [this.category()],
                datasets: [
                    {
                        backgroundColor: '#F97316',
                        data: [this.value()],
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                        barPercentage: 0.3
                    },
                    {
                        backgroundColor: '#D9D9D9',
                        data: [this.maxValue()],
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                        barPercentage: 0.3
                    }
                    
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        display: false,
                        grid: {
                            display: false
                        },
                        stacked: true
                    }
                }
            }
        }
    }
}