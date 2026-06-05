import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../../translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginRequest } from '../../../core/api/authentication/user.login.request';
import { LoginValidator } from '../login-validator.validator';
import { finalize } from 'rxjs';
import { LoginService } from '../../../core/api/authentication/login.service';

@Component({
  selector: 'app-login-component',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  standalone: true
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);

  isLoading = signal(false);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, LoginValidator.isEmailFilled]],
    password: ['', [Validators.required, LoginValidator.isPasswordFilled]]
  });

  onSubmit(): void {
    const rawValue = this.form.getRawValue();

    const request: UserLoginRequest = {
      email: rawValue.email,
      password: rawValue.password
    };

    this.isLoading.set(true);

    this.loginService.login(request)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          alert(err.error);
        }
      });
  }
}