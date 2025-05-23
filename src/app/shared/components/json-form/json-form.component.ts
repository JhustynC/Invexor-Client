import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  effect,
  inject,
  signal,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonFormControl, JsonFormData } from '../../interfaces/form.interface';
import { input } from '@angular/core';
import { FetchJsonService } from './fetch-json.service';
import { CommonModule } from '@angular/common';
import { TableCompositionComponent } from '../table-composition/table-composition.component';

@Component({
  selector: 'json-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './json-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./json-form.component.css'],
})
export class JsonFormComponent implements AfterViewInit {
  //! Usar este formilario para toda la aplicación

  private formBuilder = inject(FormBuilder);
  private fetchJsonService = inject(FetchJsonService);

  jsonFormDataUrl = input<string>();
  jsonFormData = signal<JsonFormData>({ controls: [] });
  myForm: FormGroup = this.formBuilder.group({});

  ngAfterViewInit() {
    const url = this.jsonFormDataUrl();
    if (url) {
      this.fetchJsonService.fetchJsonData(url).subscribe({
        next: (data) => this.jsonFormData.set(data),
        error: (err) => console.error('Error cargando JSON:', err),
      });
    }
  }

  constructor() {
    effect(() => {
      this.createForm(this.jsonFormData().controls);
    });
  }

  createForm(controls: JsonFormControl[]) {
    const group: Record<string, any> = {};

    for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators ?? {})) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) validatorsToAdd.push(Validators.nullValidator);
            break;
          case 'required':
            if (value) validatorsToAdd.push(Validators.required);
            break;
          case 'requiredTrue':
            if (value) validatorsToAdd.push(Validators.requiredTrue);
            break;
          case 'email':
            if (value) validatorsToAdd.push(Validators.email);
            break;
          // No se recomienda usar compose directamente desde JSON
        }
      }

      group[control.name] = this.formBuilder.control(
        control.value ?? '',
        validatorsToAdd
      );
    }

    this.myForm = this.formBuilder.group(group);
  }

  //! Para obtener los valores del formulario
  submitFormValues = output<any>();

  onSubmit() {
    console.log('Form valid:', this.myForm.valid);
    console.log('Form values:', this.myForm.value);
    this.submitFormValues.emit(this.myForm.value);
  }

  //* Para añadir un nuevo campo al formulario
  //TODO: Logica para guardar el formulario personalizado en cada branch (sucursal) y que se muestre al usuario una lista de los custom forms dependiendo de las sección
  //TODO: Agregar custom selects al formulario - se puede hacer despues de la inicialización del formulario en el constructor
  newFieldLabel = '';
  newFieldOptions: string = ''; // separado por coma, por ejemplo: "Opción 1, Opción 2"
  newFieldType: 'text' | 'number' | 'date' | 'select' = 'text';

  addField() {
    if (!this.newFieldLabel.trim()) return;

    // const newControlName = `field_${Date.now()}`;
    // const newControl: JsonFormControl = {
    //   name: newControlName,
    //   label: this.newFieldLabel,
    //   type: this.newFieldType,
    //   value: '',
    //   validators: { required: true },
    // };
    const newControl: JsonFormControl = {
      name: this.newFieldLabel,
      label: this.newFieldLabel,
      type: this.newFieldType,
      value: '',
      validators: { required: true },
      selectOptions: [],
    };

    // Si es tipo SELECT, parseamos las opciones
    if (this.newFieldType === 'select') {
      newControl.selectOptions = this.newFieldOptions
        .split(',')
        .map((option) => {
          const [value, label] = option.split(':');
          return { value: value.trim(), label: label.trim() };
        });
    }

    //! Esto genera el borrado de los otros campos al crea uno nuevo
    // const updatedControls = [...this.jsonFormData().controls, newControl];
    // this.jsonFormData.set({ controls: updatedControls });

    //? Solución - No volver a generar todos los controles desde 0
    this.jsonFormData().controls.push(newControl);

    //TODO: Guardar en BD en la branch especifica sin modificar el json original

    this.myForm.addControl(
      // newControlName
      this.newFieldLabel,
      this.formBuilder.control('', Validators.required)
    );

    this.newFieldLabel = '';
    this.newFieldType = 'text';
    this.newFieldOptions = '';

    //TODO: Guardar en BD en la branch especifica sin modificar el json original
  }

  //? To cancel button
  showCancelButton = input<boolean>(false);
  cancelButtonOutput = output<void>();

  onCancel() {
    this.cancelButtonOutput.emit();
  }
}
