import {
  Component,
  EventEmitter,
  Output,
  input,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'table-pagination',
  standalone: true,
  templateUrl: './table-pagination.component.html',
})
export class PaginationComponent {
  data = input<any[]>([]);
  rowsPerPage = input<number>(5);
  currentPage = input<number>(1);

  @Output() emitCurrentPage = new EventEmitter<number>();

  totalPages = computed(() =>
    Math.ceil(this.data().length / this.rowsPerPage())
  );

  goToPage(page: number) {
    this.emitCurrentPage.emit(page);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.emitCurrentPage.emit(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.emitCurrentPage.emit(this.currentPage() - 1);
    }
  }
}
