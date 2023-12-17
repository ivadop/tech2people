import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function alphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validAlphanumeric = /^[a-zA-Z0-9 ]*$/.test(control.value); // Space is also alowed

    if (validAlphanumeric) {
      return null; // No error
    } else {
      return { 'notAlphanumeric': true }; // Error, input is not alphanumeric
    }
  };
}
