import { AbstractControl } from "@angular/forms";
import { ValidationErrors } from "@angular/forms";

function isEmailFilled(control: AbstractControl): ValidationErrors | null {
    const email = control.value;

    if (email.trim().length === 0) {
        return  { invalid: true };
    }

    return null;
}

function isPasswordFilled(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (password.trim().length === 0) {
        return  { invalid: true };
    }

    return null;
}

export const LoginValidator = {
    isEmailFilled,
    isPasswordFilled
} as const;