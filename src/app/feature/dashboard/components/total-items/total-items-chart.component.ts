import { Component, OnInit } from '@angular/core';
import { ItemCharService, ItemChartData } from './services/item-chart.service';

@Component({
  selector: 'total-items-chart-dashboard',
  imports: [],
  templateUrl: './total-items-chart.component.html',
  styleUrl: './total-items-chart.component.css',
})
export class TotalItemChartComponent implements OnInit {
  public title: string = 'Total Items';
  public subtitle: string = 'Cargando...';
  public value: string = '0';
  public isLoading: boolean = false;

  constructor(private itemCharService: ItemCharService) {}
  
  ngOnInit() {
    this.loadTotalItems();
  }
  
  private loadTotalItems() {
    this.isLoading = true;
    this.itemCharService.getData().subscribe({
      next: (data: ItemChartData) => {
        console.log('Component received total items data:', data);
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.value = data.value;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading total items in component:', error);
        this.title = 'Total Items';
        this.subtitle = 'Error al cargar datos';
        this.value = '0';
        this.isLoading = false;
      }
    });
  }
}
