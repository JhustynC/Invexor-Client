import { Component, OnInit } from '@angular/core';
import { ItemCharService } from './services/item-chart.service';

@Component({
  selector: 'total-items-chart-dashboard',
  imports: [],
  templateUrl: './total-items-chart.component.html',
  styleUrl: './total-items-chart.component.css',
})
export class TotalItemChartComponent {
  //public rows: any[] = [];
  public title: string = '';
  public subtitle: string = '';
  public value: string = '';

  constructor(private itemCharService: ItemCharService) {}
  ngOnInit() {
    this.itemCharService.getData().subscribe((data) => {
      //this.rows = data.rows;
      //console.log(this.rows);
      this.title = data.title;
      this.subtitle = data.subtitle;
      this.value = data.value;
    });
  }
}
