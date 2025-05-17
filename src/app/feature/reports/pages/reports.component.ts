import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormData } from '../../../shared/components/json-form-v2/jsonFormDataV2.interface';
import { JsonFormComponentV2 } from "../../../shared/components/json-form-v2/json-form-v2.component";

@Component({
  selector: 'app-reports',
  imports: [JsonFormComponentV2],
  templateUrl: './reports.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReportsComponent {
  formData: JsonFormData = {
    title: 'Formulario de Usuario',
    description: 'Porfavor llena el formulario con tu información',
    controls: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
        validators: {
          required: true,
          minLength: { value: 3, message: 'Username must be at least 3 characters' }
        }
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        validators: {
          required: 'Email is required',
          email: true
        }
      },
      {
        name: 'userType',
        label: 'User Type',
        type: 'select',
        selectOptions: [  // Changed from 'options' to 'selectOptions'
          { value: 'admin', label: 'Administrator' },
          { value: 'user', label: 'Regular User' }
        ],
        validators: {
          required: true
        }
      }
    ]
  };

  onFormSubmit(formData: any) {
    console.log('Form submitted:', formData);
  }

  onCancel() {
    console.log('Form cancelled');
  }
 }
