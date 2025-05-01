import {Component, inject} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
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
    ReactiveFormsModule
  ],
    templateUrl: './setting-window.component.html',
    standalone: true,
    styleUrl: './setting-window.component.css'
})
export class SettingWindowComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

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
    this.authService.logOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  changeTheme($event: Event) {
    //cambio de tema
  }
}
