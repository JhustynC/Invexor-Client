import { Component, OnInit, output } from '@angular/core';

@Component({
  selector: 'sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.css'],
})
export class SubListComponent {
  constructor() {}

  //* Consumir datos de un servicio
  options = [
    'Administrator',
    'Items Manager',
    'User',
    'RRHH',
    'Accounting',
    'Support',
    'Sales',
    'Marketing',
    'Development',
    'Security',
  ];

  selectedOptions: Set<string> = new Set();
  selectedOptionsOutput = output<Set<string>>();

  toggleSelection(option: string) {
    if (this.selectedOptions.has(option)) {
      this.selectedOptions.delete(option);
    } else {
      this.selectedOptions.add(option);
    }
    this.selectedOptionsOutput.emit(this.selectedOptions);
  }

  getSelectedOptions(): string[] {
    return Array.from(this.selectedOptions);
  }
}
