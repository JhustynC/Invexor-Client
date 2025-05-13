import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputLoginComponent } from "./components/input-login/input-login.component";

@Component({
  selector: 'login-feature',
  imports: [InputLoginComponent],
  templateUrl: './login.component.html',
})
export default class LoginComponent { }
