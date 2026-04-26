import { AbstractControl } from "@angular/forms";
import { ValidationErrors } from "@angular/forms";

function passwordStrength(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    console.log(password);

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumericChar = /[0-9]/.test(password);
    const hasSpecialCharacters = /[^A-Za-z0-9]/.test(password);
    const hasMinimumLength = password.length >= 8;

    const isPasswordValid = hasUpperCase && hasLowerCase && hasNumericChar && hasSpecialCharacters && hasMinimumLength;

    const validationErrors = {
        hasUpperCase: !hasUpperCase,
        hasLowerCase: !hasLowerCase,
        hasNumericChar: !hasNumericChar,
        hasSpecialCharacters: !hasSpecialCharacters,
        hasMinimumLength: !hasMinimumLength
    };

    return isPasswordValid ? null : validationErrors;
}

function matchPassword(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = control.value;
    const password = control?.parent?.get('password')?.value;

    if (!password) {
        return null;
    }

    return confirmPassword === password ? null : { mismatch: true };
}

const PasswordValidator = {
    passwordStrength,
    matchPassword
};

export default PasswordValidator;