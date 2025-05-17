import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, finalize, of } from 'rxjs';
import { JsonFormData, FormControlType, JsonFormControl, OptionInput, SelectOption } from './jsonFormDataV2.interface';
import { FetchJsonServiceV2Service } from './fetchJsonServiceV2.service';


@Component({
  selector: 'json-form-v2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './json-form-v2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './json-form-v2.component.css',
  host: {
    class: 'json-form-container'
  }
})
export class JsonFormComponentV2 {
  //* Entradas con señales
  formData = input<JsonFormData | null>(null); //? Para conseguir los campos un componente
  formDataUrl = input<string | undefined>(undefined);//? Para conseguir los campos desde un JSON
  submitText = input('Enviar');
  showCancelButton = input(false);
  cancelButtonText = input('Cancelar');
  submitButtonText = input('Enviar');
  loading = input(false);

  //* Servicios
  fetchJsonService = inject(FetchJsonServiceV2Service);

  //* Salidas
  formSubmit = output<any>();
  cancel = output<void>();
  formStatusChange = output<'VALID' | 'INVALID'>();

  //* Referencias de la vista
  private formRef = viewChild.required('formRef');

  //* Estados
  readonly formLoading = signal(false);
  readonly formError = signal<string | null>(null);
  readonly formSuccess = signal<string | null>(null);
  readonly formDataSignal = signal<JsonFormData>({ controls: [] });

  //* Valores computados
  readonly isLoading = computed(() => this.formLoading() || this.loading());
  readonly hasError = computed(() => !!this.formError());
  readonly hasSuccess = computed(() => !!this.formSuccess());
  readonly formControls = computed(() => this.formDataSignal().controls);
  readonly visibleControls = computed(() =>
    this.formControls().filter(control => this.isControlVisible(control))
  );

  //* Formulario
  private readonly fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({});

  constructor() {
    //? Carga los datos del formulario cuando cambia la URL
    effect(() => {
      const url = this.formDataUrl();
      if (url) {
        this.loadFormData(url);
      }
    });

    //? Construye el formulario cuando cambian los datos
    effect(() => {
      const data = this.formData();
      if (data) {
        this.formDataSignal.set(data);
        this.buildForm(data.controls);
      }
    });

    //* Emite el estado del formulario
    effect(() => {
      const status = this.form.valid ? 'VALID' : 'INVALID';
      this.formStatusChange.emit(status);
    });
  }

  public loadFormData(url: string) {
    this.formLoading.set(true);
    this.fetchJsonService.fetchJsonData(url)
      .pipe(
        catchError(error => {
          this.formError.set('No se pudo cargar la configuración del formulario');
          console.error('Error al cargar el formulario:', error);
          return of(null);
        }),
        finalize(() => this.formLoading.set(false))
      )
      .subscribe(data => {
        if (data) {
          this.formDataSignal.set(data);
          this.buildForm(data.controls);
        }
      });
  }

  private buildForm(controls: JsonFormControl[]) {
    const group: { [key: string]: any } = {};

    controls.forEach(control => {
      if (control.hidden) return;

      const validators = this.getValidators(control);
      const asyncValidators = this.getAsyncValidators(control);

      group[control.name] = [
        {
          value: control.value ?? null,
          disabled: control.disabled
        },
        validators,
        asyncValidators
      ];
    });

    this.form = this.fb.group(group);
  }

  private getValidators(control: JsonFormControl): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (!control.validators) return validators;

    if (control.validators.required) {
      validators.push(Validators.required);
    }

    if (control.validators.minLength) {
      const minLength = typeof control.validators.minLength === 'number'
        ? control.validators.minLength
        : control.validators.minLength.value;
      validators.push(Validators.minLength(minLength));
    }

    if (control.validators.maxLength) {
      const maxLength = typeof control.validators.maxLength === 'number'
        ? control.validators.maxLength
        : control.validators.maxLength.value;
      validators.push(Validators.maxLength(maxLength));
    }

    if (control.validators.pattern) {
      const pattern = typeof control.validators.pattern === 'string'
        ? control.validators.pattern
        : control.validators.pattern.value;
      validators.push(Validators.pattern(pattern));
    }

    if (control.validators.email) {
      validators.push(Validators.email);
    }

    if (control.validators.custom?.length) {
      control.validators.custom.forEach(customValidator => {
        validators.push(customValidator.validator);
      });
    }

    return validators;
  }

  private getAsyncValidators(control: JsonFormControl): AsyncValidatorFn[] {
    //? Para agregar validadores asíncronos si se requieren
    return [];
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  /*
   * Normaliza distintos formatos de opciones en un formato estándar SelectOption[]
   * Soporta múltiples formatos de entrada:
   * - Array de SelectOption: [{label: 'Opción 1', value: '1'}, ...]
   * - Array de strings: ['Opción 1', 'Opción 2']
   * - Objeto: { '1': 'Opción 1', '2': 'Opción 2' }
   * - String (separado por saltos de línea): '1: Opción 1\n2: Opción 2' o 'Opción 1\nOpción 2'
   */
  private normalizeOptions(input: OptionInput | undefined): SelectOption[] {
    if (!input) return [];

    if (Array.isArray(input) && input.length > 0 && typeof input[0] === 'object' && 'label' in input[0] && 'value' in input[0]) {
      return input as SelectOption[];
    }

    if (Array.isArray(input)) {
      return input.map(item => ({
        label: String(item),
        value: item,
      }));
    }

    if (typeof input === 'object' && input !== null) {
      return Object.entries(input).map(([value, label]) => ({
        label: String(label),
        value: value,
      }));
    }

    if (typeof input === 'string') {
      return input
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
          const [value, ...labelParts] = line.split(':');
          const label = labelParts.length > 0 ? labelParts.join(':').trim() : value.trim();

          return {
            label: label || value.trim(),
            value: value.trim(),
          };
        });
    }

    return [];
  }

  /*
   * Obtiene las opciones de un control, soportando múltiples formatos antiguos y nuevos
   */
  public getOptions(control: JsonFormControl): SelectOption[] {
    if (control.optionsInput !== undefined) {
      return this.normalizeOptions(control.optionsInput);
    }

    if (control.selectOptions) {
      if (Array.isArray(control.selectOptions) && control.selectOptions.length > 0 && 'label' in control.selectOptions[0] && 'value' in control.selectOptions[0]) {
        return control.selectOptions as SelectOption[];
      }
      return this.normalizeOptions(control.selectOptions);
    }

    if ('optionsText' in control && control.optionsText) {
      return this.normalizeOptions(control.optionsText);
    }

    return [];
  }

  getErrorMessage(controlName: string): string {
    const control = this.getControl(controlName);
    if (!control?.errors) return '';

    const errors = control.errors;
    if (errors['required']) return 'Este campo es obligatorio';
    if (errors['minlength']) return `La longitud mínima es de ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `La longitud máxima es de ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['min']) return `El valor mínimo es ${errors['min'].min}`;
    if (errors['max']) return `El valor máximo es ${errors['max'].max}`;
    if (errors['email']) return 'Por favor, ingrese un correo electrónico válido';
    if (errors['pattern']) return 'Formato inválido';
    if (errors['custom']) return errors['custom'];

    return 'Campo inválido';
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.formError.set(null);
    this.formSuccess.set(null);

    try {
      this.formSubmit.emit(this.form.value);
      this.formSuccess.set('¡Formulario enviado con éxito!');
    } catch (error) {
      this.formError.set('Ocurrió un error al enviar el formulario');
      console.error('Error al enviar el formulario:', error);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  private markAllAsTouched() {
    Object.values(this.form.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markGroupAsTouched(control);
      } else if (control instanceof FormArray) {
        this.markArrayAsTouched(control);
      }
    });
  }

  private markGroupAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markGroupAsTouched(control);
      } else if (control instanceof FormArray) {
        this.markArrayAsTouched(control);
      }
    });
  }

  private markArrayAsTouched(formArray: FormArray) {
    formArray.controls.forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markGroupAsTouched(control);
      } else if (control instanceof FormArray) {
        this.markArrayAsTouched(control);
      }
    });
  }

  // Método auxiliar para convertir las opciones a texto para el área de texto
  getOptionsText(control: JsonFormControl | Partial<JsonFormControl>): string {
    if (!control) return '';

    // Verificar primero optionsInput (nuevo formato)
    if ('optionsInput' in control && control.optionsInput !== undefined) {
      if (typeof control.optionsInput === 'string') {
        return control.optionsInput;
      }
      // Convertir array u objeto a string
      const options = this.normalizeOptions(control.optionsInput);
      return options.map(opt => opt.label === opt.value ? opt.value : `${opt.value}: ${opt.label}`).join('\n');
    }

    // Verificar selectOptions (formato antiguo)
    if ('selectOptions' in control && control.optionsInput) {
      const options = this.normalizeOptions(control.optionsInput);
      return options.map(opt => opt.label === opt.value ? opt.value : `${opt.value}: ${opt.label}`).join('\n');
    }

    return '';
  }

  //! Gestión dinámica de campos
  newField = signal<Partial<JsonFormControl>>({
    type: 'text',
    validators: {}
  });

  // Actualizar las opciones del campo a partir del texto ingresado en el área de texto
  updateFieldOptions(text: string) {
    this.newField.update(currentField => ({
      ...currentField,
      optionsInput: text || undefined,
      // Limpiar las selectOptions antiguas para evitar conflictos
      selectOptions: undefined
    }));
  }

  updateFieldLabel(label: string) {
    this.newField.update(field => ({
      ...field,
      label
    }));
  }

  updateRequiredValidator(required: boolean) {
    this.newField.update(field => ({
      ...field,
      validators: {
        ...field.validators,
        required: required || undefined
      }
    }));
  }

  updateFieldName(name: string) {
    this.newField.update(field => ({
      ...field,
      name
    }));
  }

  updateFieldType(type: FormControlType) {
    this.newField.update(field => ({
      ...field,
      type
    }));
  }

  // updateFieldValue(value: any) {
  //   this.newField.update(field => ({
  //     ...field,
  //     value
  //   }));
  // }

  // updateFieldValidators(validators: any) {
  //   this.newField.update(field => ({
  //     ...field,
  //     validators
  //   }));
  // }

  addField() {
    const field = this.newField();
    if (!field.name || !field.label) return;

    // Preparar el nuevo control
    const newControl: JsonFormControl = {
      name: field.name,
      label: field.label,
      type: field.type as FormControlType || 'text',
      value: field.value ?? '',
      validators: { ...(field.validators || {}) }
    };

    //? Manejar las opciones basadas en el formato de entrada
    if (field.optionsInput !== undefined) {
      newControl.optionsInput = field.optionsInput;
    } else if (field.optionsInput) {
      newControl.optionsInput = field.optionsInput;
    }

    //? Crear el control del formulario con validadores
    const validators = this.getValidators(newControl);
    const asyncValidators = this.getAsyncValidators(newControl);

    this.form.addControl(
      newControl.name,
      this.fb.control(newControl.value, { validators, asyncValidators })
    );

    // Actualizar la señal de datos del formulario
    this.formDataSignal.update(data => ({
      ...data,
      controls: [...data.controls, newControl]
    }));

    // Reiniciar el formulario del nuevo campo
    this.newField.set({
      type: 'text',
      validators: {}
    });
  }

  removeField(controlName: string) {
    if (!confirm('¿Estás seguro de que deseas eliminar este campo?')) return;

    this.form.removeControl(controlName);

    this.formDataSignal.update(data => ({
      ...data,
      controls: data.controls.filter(control => control.name !== controlName)
    }));
  }

  isControlVisible(control: JsonFormControl): boolean {
    if (control.hidden) return false;
    //TODO: Logica de visibilidad
    return true;
  }
}
