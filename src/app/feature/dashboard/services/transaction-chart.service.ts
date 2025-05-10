import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionChartService {
  public title: string = 'Titulo del padre';
  public description: string = 'Descripcion del padre';
  public rows: any[] = [];
  constructor() { 
    this.rows = [
      {date: 'Tue, 11 jun 2025', date_hour: '10:00', type: 'Create User', id: '102405567578'},
      {date: 'Tue, 12 jun 2025', date_hour: '11:00', type: 'Create Item', id: '102405567580'},
      {date: 'Tue, 13 jun 2025', date_hour: '12:00', type: 'Transfer Item', id: '102405567593'},
      {date: 'Tue, 14 jun 2025', date_hour: '13:00', type: 'Transfer Branch', id: '102407587578'},
      {date: 'Tue, 14 jun 2025', date_hour: '14:00', type: 'Create Branch', id: '123123123127'}
    ];
  }
}
