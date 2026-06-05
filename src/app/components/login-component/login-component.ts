import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserLoginRequest } from '../../core/api/authentication/user.login.request';
import { UserLoginResponse } from '../../core/api/authentication/user.login.response';
import LoginValidator from '../../shared/validators/login-validator.validator';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-component',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  standalone: true
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

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

    this.http.post<UserLoginResponse>(`${environment.backendUrl}/Authentication`, request)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.authService.currentUserSignal.set(response);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid email or password'); // Or use a nice toast notification
        }
      });
  }
}