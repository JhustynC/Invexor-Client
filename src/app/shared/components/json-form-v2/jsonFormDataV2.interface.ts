import { AbstractControl, ValidationErrors } from "@angular/forms";

export type FormControlType =
  | 'text'
  | 'number'
  | 'date'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio';

export interface JsonFormData {
  controls: JsonFormControl[];
  title?: string;
  description?: string;
  submitText?: string;
}

//? Tipo para definir las opciones en diferentes formatos
export type OptionInput =
  | SelectOption[]
  | string[]
  | { [key: string]: any }
  | string; //? Para tipos de textarea

export interface JsonFormControl {
  name: string;
  label: string;
  value?: any;
  type: FormControlType;
  placeholder?: string;
  description?: string;
  validators?: JsonFormValidators;
  options?: JsonFormOptions;
  /** @deprecated Usar `optionsInput` en su lugar */
  selectOptions?: SelectOption[] | OptionInput;
  /** Input options en varios formatos (array, object, string) */
  optionsInput?: OptionInput;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
}

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface JsonFormValidators {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  pattern?: string | { value: string; message: string };
  email?: boolean | string;
  custom?: CustomValidator[];
}

export interface CustomValidator {
  validator: (control: AbstractControl) => ValidationErrors | null;
  message: string;
}

export interface JsonFormOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
  rows?: number; // For textarea
  cols?: number; // For textarea
}
