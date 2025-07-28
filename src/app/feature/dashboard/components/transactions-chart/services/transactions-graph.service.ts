import { Injectable } from "@angular/core";
import { TransactionStatistics } from "../Dtos/transaction-statistics";
import { Observable, map, catchError, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../../environments/environment';

export interface TransactionPeriodData {
    period: string;
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionsGraphService {

    private baseURL = `${environment.apiUrl}/dashboard/transactions-by-period`;

    constructor(private http: HttpClient) {}

    getTransactionsByPeriod(period: 'month' | 'year', year?: number): Observable<TransactionPeriodData[]> {
        let url = `${this.baseURL}/${period}`;
        if (year) {
            url += `/${year}`;
        }

        return this.http.get<any>(url).pipe(
            map((response: any) => {
                console.log('API Response for transactions by period:', response);

                // Verificar si la respuesta es un array directamente
                if (Array.isArray(response)) {
                    return response as TransactionPeriodData[];
                }

                // Si no es array, buscar en propiedades comunes
                if (response && Array.isArray(response.data)) {
                    return response.data as TransactionPeriodData[];
                }

                if (response && Array.isArray(response.transactions)) {
                    return response.transactions as TransactionPeriodData[];
                }

                console.error('Unexpected API response format:', response);
                return [];
            }),
            catchError((error) => {
                console.error('Error fetching transactions by period:', error);
                return of([]);
            })
        );
    }

    getTransactionStatistics(period: 'month' | 'year', year?: number): Observable<TransactionStatistics> {
        return this.getTransactionsByPeriod(period, year).pipe(
            map((data: TransactionPeriodData[]) => {
                console.log('getTransactionStatistics received data:', data);
                console.log('Data is array?', Array.isArray(data));

                const labels = this.generateLabels(period, data);
                const values = this.mapDataToChart(period, data);

                console.log('Generated labels:', labels);
                console.log('Generated values:', values);

                return {
                    x: labels,
                    y: [values]
                };
            })
        );
    }

    private generateLabels(period: 'month' | 'year', data: TransactionPeriodData[]): string[] {
        if (period === 'month') {
            const monthNames = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];
            return monthNames;
        } else {
            // Para años, usar los períodos devueltos por el API
            return data.map(item => item.period).sort();
        }
    }

    private mapDataToChart(period: 'month' | 'year', data: TransactionPeriodData[]): number[] {
        // Validar que data sea un array
        if (!Array.isArray(data)) {
            console.error('mapDataToChart: data is not an array:', data);
            return period === 'month' ? new Array(12).fill(0) : [];
        }

        if (period === 'month') {
            // Crear array de 12 meses con valores por defecto 0
            const monthlyData = new Array(12).fill(0);

            // Llenar con los datos reales
            data.forEach(item => {
                if (item && typeof item.period !== 'undefined' && typeof item.total !== 'undefined') {
                    const monthIndex = parseInt(item.period.toString()) - 1; // Convertir a índice base 0
                    if (monthIndex >= 0 && monthIndex < 12) {
                        monthlyData[monthIndex] = Number(item.total) || 0;
                    }
                }
            });

            return monthlyData;
        } else {
            // Para años, devolver los totales ordenados por período
            return data
                .filter(item => item && typeof item.period !== 'undefined' && typeof item.total !== 'undefined')
                .sort((a, b) => parseInt(a.period.toString()) - parseInt(b.period.toString()))
                .map(item => Number(item.total) || 0);
        }
    }

    // Método legacy para compatibilidad
    gettransactionStatisticsByMonth(): Observable<TransactionStatistics> {
        return this.getTransactionStatistics('month');
    }
}
