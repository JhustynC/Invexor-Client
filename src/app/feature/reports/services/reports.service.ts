import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiURL: string = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  /**
   * Genera un reporte general en formato PDF
   * @returns Observable<Blob> - El PDF como blob
   */
  generateGeneralReport(): Observable<Blob> {
    return this.http.get(`${this.apiURL}/report`, {
      responseType: 'blob'
    });
  }

  /**
   * Por ahora, todos los reportes usan el mismo endpoint general
   * En el futuro se pueden crear endpoints específicos para cada tipo
   */
  generateTransactionsReport(): Observable<Blob> {
    return this.generateGeneralReport();
  }

  /**
   * Por ahora, todos los reportes usan el mismo endpoint general
   * En el futuro se pueden crear endpoints específicos para cada tipo
   */
  generateItemsReport(): Observable<Blob> {
    return this.generateGeneralReport();
  }

  /**
   * Convierte un Blob en una URL para mostrar en el visor PDF
   * @param blob - El blob del PDF
   * @returns string - URL del blob
   */
  createPdfUrl(blob: Blob): string {
    return URL.createObjectURL(blob);
  }

  /**
   * Libera la memoria de una URL de blob
   * @param url - URL del blob a liberar
   */
  revokePdfUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}
