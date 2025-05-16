export interface JsonFormData {
  controls: JsonFormControl[];
}

export interface JsonFormControl {
  name: string;
  label: string;
  value: string;
  type: string;
  validators: JsonFormValidators;
  options?: JsonFormOptions;
  selectOptions?: SelectOptions[]; // Para campos tipo select
}

export interface SelectOptions {
  label: string;
  value: any;
}

export interface JsonFormValidators {
  required?: boolean;
  minLength?: number;
}

export interface JsonFormOptions {
  min: string;
  max: string;
  step: string;
  icon: string;
}
