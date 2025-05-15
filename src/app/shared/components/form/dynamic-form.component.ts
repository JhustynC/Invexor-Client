import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'dynamic-form-shared',
  templateUrl: './dynamic-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class DynamicFormComponent {
  //! DON'T USE THIS FORM IS A PROTOTYPE

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      campos: this.fb.array([]), // Inicialmente sin campos
    });
  }

  get campos(): FormArray {
    return this.formulario.get('campos') as FormArray;
  }

  agregarCampo(): void {
    const campo = this.fb.control('', Validators.required);
    this.campos.push(campo);
  }

  eliminarCampo(index: number): void {
    this.campos.removeAt(index);
  }

  enviar(): void {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
