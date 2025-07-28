import { ChangeDetectionStrategy, Component, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReportsService } from '../services/reports.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [PdfViewerModule, CommonModule],
  templateUrl: './reports.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReportsComponent implements OnDestroy {
  private reportsService = inject(ReportsService);
  // private cdr = inject(ChangeDetectorRef);

  pdfSrc: string | null = null;
  isLoading = false;
  currentReportType: string | null = null;
  errorMessage: string | null = null;

  // Genera el reporte general del dashboard
  generateGeneralReport() {
    this.loadReport('Reporte General', () =>
      this.reportsService.generateGeneralReport()
    );
  }

  // Genera el reporte de transacciones
  generateTransactionsReport() {
    this.loadReport('Reporte de Transacciones', () =>
      this.reportsService.generateTransactionsReport()
    );
  }

  // Genera el reporte de items por tipo
  generateItemsReport() {
    this.loadReport('Reporte de Items', () =>
      this.reportsService.generateItemsReport()
    );
  }


  // Método genérico para cargar reportes
  private loadReport(reportType: string, reportGenerator: () => any) {
    this.isLoading = true;
    this.currentReportType = reportType;
    this.errorMessage = null;
    // this.cdr.detectChanges(); // Forzar detección de cambios

    // Limpiar PDF anterior si existe
    if (this.pdfSrc) {
      this.reportsService.revokePdfUrl(this.pdfSrc);
      this.pdfSrc = null;
    }

    console.log(`Iniciando generación de ${reportType}...`);

    reportGenerator().subscribe({
      next: (blob: Blob) => {
        console.log(`${reportType} generado exitosamente`, blob);
        this.pdfSrc = this.reportsService.createPdfUrl(blob);
        this.isLoading = false;
        // this.cdr.detectChanges(); // Forzar detección de cambios
      },
      error: (error: any) => {
        console.error(`Error generando ${reportType}:`, error);
        this.errorMessage = `Error al generar ${reportType}. Por favor, intenta nuevamente.`;
        this.isLoading = false;
        // this.cdr.detectChanges(); // Forzar detección de cambios
      }
    });
  }

  // Descarga el PDF actual
  downloadPdf() {
    if (!this.pdfSrc || !this.currentReportType) {
      console.error('No hay PDF disponible para descargar');
      return;
    }

    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = this.pdfSrc;
    link.download = `${this.currentReportType.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    link.style.display = 'none';
    
    // Agregar al DOM, hacer clic y remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Descargando: ${this.currentReportType}`);
  }

  // Limpia recursos al destruir el componente
  ngOnDestroy() {
    if (this.pdfSrc) {
      this.reportsService.revokePdfUrl(this.pdfSrc);
    }
  }


}
