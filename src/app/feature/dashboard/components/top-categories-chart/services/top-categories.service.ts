import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

export interface ItemsByTypeResponse {
  name: string;
  count: number;
}

export interface TopCategoriesData {
  labels: string[];
  data: number[];
}

@Injectable({
  providedIn: 'root'
})
export class TopCategoriesService {
  private apiURL: string = `${environment.apiUrl}/dashboard/items-by-type`;

  constructor(private http: HttpClient) {}

  getItemsByType(): Observable<TopCategoriesData> {
    return this.http.get<ItemsByTypeResponse[]>(this.apiURL).pipe(
      map((response: ItemsByTypeResponse[]) => {
        console.log('Items by type API response:', response);
        
        // Validar que la respuesta sea un array
        if (!Array.isArray(response)) {
          console.error('Expected array response, got:', response);
          return this.getEmptyData();
        }
        
        // Ordenar por count descendente y tomar los top 5
        const sortedItems = response
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        
        return {
          labels: sortedItems.map(item => item.name || 'Unknown'),
          data: sortedItems.map(item => item.count || 0)
        };
      }),
      catchError((error) => {
        console.error('Error fetching items by type:', error);
        return of(this.getEmptyData());
      })
    );
  }
  
  private getEmptyData(): TopCategoriesData {
    return {
      labels: ['Sin datos'],
      data: [0]
    };
  }
}
