import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionChartService {
  public title: string = '';
  public description: string = '';
  public rows: any[] = [];

  private apiURL: string = 'transaction-chart.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }
}
