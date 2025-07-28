import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.css'],
  imports: [FormsModule]
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
  clickedAddItem = signal<boolean>(false);
  newItem = signal<string>('');
  showButton = input<boolean>(true);
  headerText = input<string>('Custom properties');

  initialSelectedOptions = input<Set<string>>();
  ngOnInit() {
    const initialSelection = this.initialSelectedOptions();

    // Asegúrate de que el valor del input existe y es un array
    if (initialSelection && Array.isArray(initialSelection)) {
      initialSelection.forEach(item => {
        // Solo añade la opción si existe en tu lista de opciones disponibles
        if (this.options.includes(item)) {
          this.selectedOptions.add(item);
        }
      });
    }
  }
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

  addItem() {
    this.options = [...this.options, this.newItem()];
  }
}
