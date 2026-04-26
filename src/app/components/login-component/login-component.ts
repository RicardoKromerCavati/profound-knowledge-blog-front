import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserLoginRequest } from '../../core/api/authentication/user.login.request';
import { UserLoginResponse } from '../../core/api/authentication/user.login.response';

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

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    const rawValue = this.form.getRawValue();

    const request: UserLoginRequest = {
      email: rawValue.email,
      password: rawValue.password
    };

    this.http.post<UserLoginResponse>(`${environment.backendUrl}/Authentication`, request)
      .subscribe(response => {
        localStorage.setItem('token', response.token);
        this.authService.currentUserSignal.set(response);
        this.router.navigateByUrl('/');
      });
  }
}
