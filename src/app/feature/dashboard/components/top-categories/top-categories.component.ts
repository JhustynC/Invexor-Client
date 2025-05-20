import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TopCategoriesService } from './services/top-categories.service';
import { TopCategories } from './dtos/top-categories';
import { TopCategoriesRowComponent } from './components/top-categories-row';

@Component({
  selector: 'top-categories-dashboard',
  templateUrl: './top-categories.component.html',
  standalone: true,
  imports: [TopCategoriesRowComponent],
})
export class TopCategoriesComponent implements OnInit {
  @ViewChild('myChart', { static: true })
  chartRef!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;
  title = 'Top Categories';
  description = 'Top Categories by Amount';
  xValues = ['Italy', 'France', 'Spain', 'USA', 'Argentina'];
  yValues = [55, 49, 44, 24, 15];
  barColors = ['red', 'green', 'blue', 'orange', 'brown'];
  maxValue = 0;
  rows: any[] = [
    { name: 'Groceries', amount: 1200 },
    { name: 'Utilities', amount: 800 },
    { name: 'Entertainment', amount: 600 },
    { name: 'Transportation', amount: 400 },
    { name: 'Healthcare', amount: 300 },
  ];

  constructor(private topCategoriesService: TopCategoriesService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.topCategoriesService.getTopCategories().subscribe({
      next: (data: TopCategories) => {
        (this.xValues = data.categories), (this.yValues = data.quantities);

        this.maxValue = Math.max(...this.yValues);
      },
      error: () => {
        console.error('Error fetching top categories data');
      },
    });
  }
}
