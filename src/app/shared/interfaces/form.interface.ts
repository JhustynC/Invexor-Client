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
