import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class TransactionChartService {
  public title: string = '';
  public description: string = '';
  public rows: any[] = [];

  private apiURL: string = `${environment.apiUrl}/dashboard/recent-transactions`;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiURL).pipe(
      map((response: any) => {
        console.log('API Response:', response);

        // Verificar si la respuesta es un array directamente
        let transactions: any[] = [];
        if (Array.isArray(response)) {
          transactions = response;
        } else if (response && Array.isArray(response.data)) {
          transactions = response.data;
        } else if (response && response.transactions && Array.isArray(response.transactions)) {
          transactions = response.transactions;
        } else {
          console.error('Unexpected API response format:', response);
          transactions = [];
        }

        return {
          title: 'Transacciones Recientes',
          description: `Últimas ${transactions.length} transacciones registradas`,
          rows: transactions.map(tx => ({
            id: tx.id || 'N/A',
            type: tx.type || 'N/A',
            amount: tx.amount || 0,
            date: tx.date ? new Date(tx.date).toLocaleDateString('es-ES') : 'N/A',
            status: 'Completada' // Estado por defecto
          }))
        };
      }),
      catchError((error) => {
        console.error('Error fetching transactions:', error);
        return of({
          title: 'Transacciones Recientes',
          description: 'Error al cargar las transacciones',
          rows: []
        });
      })
    );
  }
}
