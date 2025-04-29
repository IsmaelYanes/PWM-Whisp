import {Component, inject} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  dateFutureValidatorControl,
  dateValidValidatorControl,
  passwordMatchValidator
} from '../../validators/createAccount.validator'
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.interface';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-createAccount',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './createAccount.component.html',
  styleUrl: './createAccount.component.css'
})
export class CreateAccountComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user: User = {
    email: '',
    name: '',
    birthday: '',
    imageProfile: '../../../assets/images/icons/0.jpg',
    contact: [],
    request: [],
    chat: {}
  }

  /*Herramienta para crear formularios reactivos +rápidos y +legibles
  * Ayuda a crear: FormGroup, FormControl, FormArray
  * */
  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder); //no va a permitir que sea nulo

  form: FormGroup = this.formBuilder.group({
    //email: ['', [Validators.required, Validators.pattern(/^(?=[^@]*[a-zA-Z])([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]], //nunca será null, solo string
    email: ['', [Validators.required, Validators.email]], //nunca será null, solo string
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])(?=.{8,}).+$/)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])(?=.{8,}).+$/)]],
    name: ['', Validators.required],
    birthday: ['', [Validators.required, dateFutureValidatorControl, dateValidValidatorControl]],
  }, {validators: [passwordMatchValidator]});

  onSubmit() {
    if (this.form.valid) {
      this.user = {...this.user, ...this.form.value};
      this.authService.signUp(this.user).then(() => {
        this.form.reset();
        toast.success('Usuario creado correctamente');
        this.router.navigate(['login']);
      }).catch(error => {
        toast.error("No se ha podido crear el usuario");
      });
    }
  }

  formatDateForMax(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
