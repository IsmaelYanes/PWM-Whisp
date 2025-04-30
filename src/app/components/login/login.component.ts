// header.component.ts
import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import {User} from '../../models/user.interface';
import {toast} from 'ngx-sonner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  /*Herramienta para crear formularios reactivos +rápidos y +legibles
  * Ayuda a crear: FormGroup, FormControl, FormArray
  * */
  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder); //no va a permitir que sea nulo

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], //nunca será null, solo string
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])(?=.{8,}).+$/)]],
  });

  user!: User;

  onSubmit() {
    if (this.form.valid) {
      this.user = {...this.user, ...this.form.value};
      this.authService.signIn(this.user)
        .then(() => {
          this.form.reset();
          toast.success('Hola nuevamente');
          this.router.navigate(['mainPage']);
      }).catch(error => {
        toast.error("El usuario no existe o contraseña incorrecta");
      });
    }
  }
}
