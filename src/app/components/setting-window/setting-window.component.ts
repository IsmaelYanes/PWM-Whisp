import {Component, inject} from '@angular/core';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  passwordMatchValidator,
  passwordMatchFirebaseValidator
} from '../../validators/settingWindow.validator'
import {toast} from 'ngx-sonner';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-setting-window',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
    templateUrl: './setting-window.component.html',
    standalone: true,
    styleUrl: './setting-window.component.css'
})
export class SettingWindowComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  theme = "normal";
  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  form: FormGroup = this.formBuilder.group({
    currentPassword: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)],
      [passwordMatchFirebaseValidator(this.authService)]],
    newPassword: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)]],
    confirmPassword: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[.$@$!%*?&])[A-Za-zÑñ\d.$@$!%*?&]+$/)]],
  }, {validators: [passwordMatchValidator]});

  changePassword (){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.changePassword(this.form.value.newPassword)
    this.form.reset();
  }

  showPasswordMatchError() {
    return this.form.get('confirmPassword')?.touched &&
      this.form.get('newPassword')?.touched &&
      (this.form.get("newPassword")?.value != "") &&
      (this.form.get('confirmPassword')?.value != "") &&
      this.form.errors?.['passwordMismatch'];
  }

  get isFormTouchedAndInvalid() {
    return this.form.invalid && this.form.touched;
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }

  changeTheme() {
    const windows = document.querySelectorAll('.contentWindow');
    const containers = document.querySelectorAll('.player-container');

    if (this.theme === 'dark') {
      windows.forEach(el => (el as HTMLElement).style.backgroundColor = '#27374D');
      containers.forEach(el => (el as HTMLElement).style.backgroundColor = '#DDE6ED');

      (document.querySelector('.toolbar') as HTMLElement)?.style.setProperty('background-color', '#526D82');
      (document.querySelector('.chat-panel') as HTMLElement)?.style.setProperty('background-color', '#9DB2BF');
      (document.querySelector('.chatPanel-container') as HTMLElement)?.style.setProperty('background-color', '#9DB2BF');

    } else {
      windows.forEach(el => (el as HTMLElement).style.backgroundColor = '#e5ddd5');
      containers.forEach(el => (el as HTMLElement).style.backgroundColor = '#fff');

      (document.querySelector('.toolbar') as HTMLElement)?.style.setProperty('background-color', '#7b92ac');
      (document.querySelector('.chat-panel') as HTMLElement)?.style.setProperty('background-color', '#fff');
      (document.querySelector('.chatPanel-container') as HTMLElement)?.style.setProperty('background-color', '#fff');
    }
  }
}
