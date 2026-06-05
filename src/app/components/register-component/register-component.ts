import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterRequest } from '../../core/api/register/user.register.request';
import PasswordValidator from '../../shared/validators/password-validator.validator';
import { finalize } from 'rxjs';
import { RegisterService } from '../../core/api/services/register.service';
import { UserRegisterResponse } from '../../core/api/register/user.register.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-component',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
  standalone: true
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly registerService = inject(RegisterService);

  form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, PasswordValidator.passwordStrength]],
    confirmPassword: ['', [Validators.required, PasswordValidator.matchPassword]],
  });

  isLoading = signal(false);

  onSubmit(): void {
    const formRawValues = this.form.getRawValue();

    const userRegisterRequest: UserRegisterRequest = {
      email: formRawValues.email,
      password: formRawValues.password,
      username: formRawValues.username
    };

    this.isLoading.set(true);

    this.registerService.register(userRegisterRequest)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response: UserRegisterResponse) => {
          alert(response.message);
          this.router.navigateByUrl('/login');
        },
        error: (err: HttpErrorResponse) => {
          alert(err.error);
        }
      });
  }
}
