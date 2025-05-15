import {
  Component,
  signal,
  effect,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DynamicField {
  label: string;
  type: 'text' | 'number' | 'date';
  value: any;
}

@Component({
  selector: 'app-dynamic-json-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-json-form.component.html',
  styleUrls: ['./dynamic-json-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicJsonFormComponent {
  //! DON'T USE THIS FORM IS A PROTOTYPE

  private readonly STORAGE_KEY = 'dynamic-json-form-config';
  fields = signal<DynamicField[]>([]);

  newFieldLabel = '';
  newFieldType: DynamicField['type'] = 'text';

  constructor() {
    this.loadFromLocalStorage();
    effect(() => {
      // Guarda automáticamente cada vez que cambian los campos
      this.saveToLocalStorage();
    });
  }

  addField() {
    if (!this.newFieldLabel.trim()) return;
    this.fields.update((f) => [
      ...f,
      {
        label: this.newFieldLabel,
        type: this.newFieldType,
        value: '',
      },
    ]);
    this.newFieldLabel = '';
    this.newFieldType = 'text';
  }

  removeField(index: number) {
    this.fields.update((f) => f.filter((_, i) => i !== index));
  }

  saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.fields()));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        this.fields.set(JSON.parse(data));
      } catch {}
    }
  }

  resetForm() {
    this.fields.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  onSubmit() {
    console.log('Form valid:', this.fields);
  }
}
