import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

export interface TotalItemsResponse {
  total: number;
}

export interface ItemChartData {
  title: string;
  subtitle: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemCharService {
  private apiURL: string = `${environment.apiUrl}/dashboard/total-items`;

  constructor(private http: HttpClient) { }
    
  getData(): Observable<ItemChartData> {
    return this.http.get<TotalItemsResponse>(this.apiURL).pipe(
      map((response: TotalItemsResponse) => {
        console.log('Total items API response:', response);
        
        const total = response.total || 0;
        
        return {
          title: 'Total Items',
          subtitle: 'Items registrados en el sistema',
          value: total.toString()
        } as ItemChartData;
      }),
      catchError((error) => {
        console.error('Error fetching total items:', error);
        return of({
          title: 'Total Items',
          subtitle: 'Error al cargar datos',
          value: '0'
        } as ItemChartData);
      })
    );
  }
}
