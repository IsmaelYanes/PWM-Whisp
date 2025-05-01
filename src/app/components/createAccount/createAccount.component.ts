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
  passwordMatchValidator,
  userNameExistsValidator
} from '../../validators/createAccount.validator'
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.interface';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-createAccount',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './createAccount.component.html',
  styleUrl: './createAccount.component.css'
})
export class CreateAccountComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  user: User = {
    email: '',
    name: '',
    birthday: '',
    profilePhoto: 'assets/images/icons/0.jpg',
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
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)]],
    name: ['', [Validators.required], [userNameExistsValidator(this.userService)]],
    birthday: ['', [Validators.required, dateFutureValidatorControl, dateValidValidatorControl]],
  }, {validators: [passwordMatchValidator]});

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.user = {...this.user, ...this.form.value};
    this.authService.signUp(this.user).then(() => {
      this.form.reset();
      toast.success('Usuario creado correctamente');
      this.router.navigate(['login']);
    }).catch(error => {
      toast.error("No se ha podido crear el usuario");
    });
  }

showPasswordMatchError() {
  return this.form.get('password_confirmation')?.touched &&
    this.form.get('password')?.touched &&
    (this.form.get("password")?.value != "") &&
    (this.form.get('password_confirmation')?.value != "") &&
    this.form.errors?.['passwordMismatch'];
}

  formatDateForMax(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit() {
    /*this.userService.getUsers().subscribe(users => {
      for (const user of users) {
        console.log(user);
      }
    })*/
  }

}
