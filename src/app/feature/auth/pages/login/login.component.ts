import {
  Component,
  inject,
  signal,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'login-feature',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  login() {
    const form = this.loginForm();
    if (!form.valid) return;

    const { username, password } = form.value;

    const success = this.authService.login(username, password);

    if (success) {
      this.router.navigate(['/client']);
    } else {
      console.error('❌ Credenciales inválidas');
    }
  }

  //? Validacion sincrona personalizada
  noEspaciosValidator(control: AbstractControl): ValidationErrors | null {
    const tieneEspacios = (control.value || '').includes(' ');
    return tieneEspacios ? { espaciosNoPermitidos: true } : null;
  }

  loginForm = signal<FormGroup>(
    new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.nullValidator,
        this.noEspaciosValidator,
      ]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false),
    })
  );

  onSubmit() {
    const form = this.loginForm();

    // Forzar validación de todos los campos
    form.markAllAsTouched();

    console.log('Formulario válido', form.valid);
    console.log('Valores del formulario:', form.value);

    if (!form.valid) {
      console.log('Errores de validación:');

      Object.keys(form.controls).forEach((key) => {
        const controlErrors: ValidationErrors | null | undefined =
          form.get(key)?.errors;
        if (controlErrors) {
          console.log(`❌ Campo "${key}" tiene los siguientes errores:`);
          Object.keys(controlErrors).forEach((errorKey) => {
            console.log(`   • ${errorKey}:`, controlErrors[errorKey]);
          });
        }
      });
    }
  }
}
