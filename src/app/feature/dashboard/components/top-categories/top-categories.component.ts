import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { TopCategoriesService } from "./services/top-categories.service";
import { TopCategories } from "./Dtos/top-categories";
import { TopCategoriesRowComponent } from "./components/top-categories-row";

@Component({
    selector: 'top-categories-dashboard',
    templateUrl: './top-categories.component.html',
    standalone: true,
    imports: [TopCategoriesRowComponent]
})
export class TopCategoriesComponent implements OnInit{

    @ViewChild('myChart', {static: true}) chartRef!: ElementRef<HTMLCanvasElement>;
    chart: Chart | undefined;
    title = 'Top Categories';
    description = 'Top Categories by Amount';
    xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    yValues = [55, 49, 44, 24, 15];
    barColors = ["red", "green","blue","orange","brown"];
    maxValue = 0;
    rows: any[] = [
        { name: 'Groceries', amount: 1200 },
        { name: 'Utilities', amount: 800 },
        { name: 'Entertainment', amount: 600 },
        { name: 'Transportation', amount: 400 },
        { name: 'Healthcare', amount: 300 }
    ];

    constructor(
        private topCategoriesService: TopCategoriesService
    ) {
        // Initialization logic can go here
        // Register all necessary Chart.js components
        Chart.register(...registerables);
    }

    ngOnInit(): void {

        this.topCategoriesService.getTopCategories().subscribe({
            next: (data: TopCategories) => {
                this.xValues = data.categories,
                this.yValues = data.quantities

                this.maxValue = Math.max(...this.yValues);
            },
            error: () => {
                console.error('Error fetching top categories data');
            }
        })
        //this.chart = new Chart(this.chartRef.nativeElement, this.chartConfig());
    }

    /* chartConfig(): ChartConfiguration<'bar'> {

        const maxValue = Math.max(...this.yValues);
        const barRadous = 50;

        return {
            type: 'bar',
            data: {
                labels: this.xValues,
                datasets: [
                    {
                        backgroundColor: this.barColors,
                        data: this.yValues,
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                        barThickness: 24
                    },
                    {
                        backgroundColor: '#e5e7eb',
                        data: this.yValues.map(() => maxValue),
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                        barThickness: 24
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
                        },
                        //stacked: true
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        stacked: true
                    }
                }
            }
        }
    } */
}