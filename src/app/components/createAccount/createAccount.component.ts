import {Component, inject} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-createAccount',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './createAccount.component.html',
  styleUrl: './createAccount.component.css'
})
export class CreateAccountComponent {

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
    birthday: ['', Validators.required]
  })

  handleSubmit() {
    if (!this.form.valid) {
      this.form.markAsTouched();
      return;
    }
    console.log(this.form);
  }

  addUser() {

  }
}
