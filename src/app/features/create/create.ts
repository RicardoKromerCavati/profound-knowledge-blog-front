import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/api/authentication/auth.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateValidator } from './create-validator.validator';

@Component({
  selector: 'app-create',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateComponent {
  readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  fileName = '';

  createFormGroup = this.formBuilder.nonNullable.group({
    title: [null, Validators.required],
    content: [null, Validators.required],
    fileSource: this.formBuilder.control<File | null>(null, [Validators.required, CreateValidator.isFileValid])
  });

  submitPostCreation(): void {
    alert('radical');
  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      this.createFormGroup.patchValue({
        fileSource: file
      });

      const fileControl = this.createFormGroup.get('fileSource');
      fileControl?.updateValueAndValidity();

      if (fileControl?.invalid) {
        fileControl.setValue(null);
        fileInput.value = '';
        alert('Arquivo inválido');
      }
    }
  }
}
