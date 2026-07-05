import { AbstractControl, ValidationErrors } from "@angular/forms";

function isFileValid(control: AbstractControl): ValidationErrors | null {

    if (!control || !control.value) { 
        return null; 
    }

    const fileInput = control.value instanceof File ? control.value.name : String(control.value);

    const allowedExtensions: RegExp = /(\.jpg|\.jpeg|\.png)$/i;

    if (!allowedExtensions.test(fileInput)) {
        return { mismatch: true };
    }

    return null;
}

export const CreateValidator = {
    isFileValid
} as const;