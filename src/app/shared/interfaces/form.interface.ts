export interface JsonFormData {
  controls: Control[];
}

export interface Control {
  name: string;
  label: string;
  value: string;
  type: string;
  validators: Validators;
  options?: Options;
}

export interface Validators {
  required?: boolean;
  minLength?: number;
}

export interface Options {
  min: string;
  max: string;
  step: string;
  icon: string;
}
