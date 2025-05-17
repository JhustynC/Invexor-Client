import { Component, OnInit } from '@angular/core';
import { ItemCharService } from './services/item-chart.service';

@Component({
  selector: 'app-item-chart',
  imports: [],
  templateUrl: './item-chart.component.html',
  styleUrl: './item-chart.component.css'
})
export class ItemChartComponent {
  //public rows: any[] = [];
  public title: string = '';
  public subtitle: string = '';
  public value: string = '';

  constructor(private itemCharService: ItemCharService) {}
  ngOnInit(){
    this.itemCharService.getData().subscribe((data) => {
      //this.rows = data.rows;
      //console.log(this.rows);
      this.title = data.title;
      this.subtitle = data.subtitle;
      this.value = data.value;
    });
  }
}
