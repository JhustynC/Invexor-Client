// ... imports
import { Component, input, signal, computed } from '@angular/core';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/table-pagination.component';
import { TitleCasePipe } from '@angular/common';
import { TableFilterbarComponent } from './filterbar/table-filterbar.component';
// ...

@Component({
  selector: 'table-composition-shared',
  templateUrl: './table-composition.component.html',
  imports: [TableComponent, PaginationComponent, TableFilterbarComponent],
})
export class TableCompositionComponent {
  //TODO: Create the dropdown menu for change data sources (To Resources (Resource Type), Users (Rols) and Items (Categories))

  //* Definición de las propiedades de entrada
  inputData = input<any[]>([]);
  rowsPerPage = input<number>(5);
  columnNames = input<string[]>([]);

  //* Definición de las propiedades internas
  currentPage = signal(1);
  searchTerm = signal('');
  sortField = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');

  //* 1. Filtro por búsqueda
  filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.inputData();
    return this.inputData().filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(term))
    );
  });

  //* 2. Ordenamiento
  sortedData = computed(() => {
    const data = [...this.filteredData()];
    const field = this.sortField();
    const direction = this.sortDirection();

    if (!field) return data;

    return data.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (aVal == null || bVal == null) return 0;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  });

  //* 3. Paginación
  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.rowsPerPage();
    const end = start + this.rowsPerPage();
    return this.sortedData().slice(start, end);
  });

  //* 4. Eventos
  onSearch(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onSortChange(field: string) {
    if (!field) {
      //? Si se selecciona "Ningún orden"
      this.sortField.set(null);
      this.sortDirection.set('asc');
      return;
    }

    this.sortField.set(field);
    this.sortDirection.set('asc');
  }

  toggleSortDirection() {
    this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
  }
}
