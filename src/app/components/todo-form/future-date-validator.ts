import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const selectedDate = new Date(control.value);
        const currentDate = new Date();

        // Resetting the time part to 00:00:00 for both dates
        selectedDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        // Check if the selected date is in the future
        if (selectedDate >= currentDate) {
            return null; // No error
        } else {
            return { 'futureDate': true }; // Error, date is not in the future
        }
    };
}

