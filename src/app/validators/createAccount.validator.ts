import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirmation = control.get('password_confirmation');
  if (!password || !passwordConfirmation) {
    return null;
  }
  return password.value === passwordConfirmation.value ? null : { passwordMismatch: true };
};

export const dateFutureValidatorControl: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null; // si no hay fecha, no validar todavía

  const birthdayValue = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (birthdayValue > today) {
    return { futureDate: true };
  }
  return null;
};

export const dateValidValidatorControl: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null; // si no hay fecha, no validar todavía

  const birthdayValue = new Date(control.value);
  const today = new Date();
  const twelveYearsAgo = new Date();
  twelveYearsAgo.setFullYear(today.getFullYear() - 12);
  today.setHours(0, 0, 0, 0);
  twelveYearsAgo.setHours(0, 0, 0, 0);

  if (birthdayValue > twelveYearsAgo) {
    return { tooYoung: true };
  }
  return null;
};

