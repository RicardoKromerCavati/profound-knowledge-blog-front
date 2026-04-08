import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../../user.interface';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserLoginRequest } from '../../core/api/authentication/user_login_request.contratct';

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
      username: rawValue.email,
      password: rawValue.password
    };
    this.http.post<UserInterface>(`${environment.backendUrl}/Authentication/login`, request)
      .subscribe(response => {
        console.log('response', response);
        console.log('token', response.token);
        response.username = rawValue.email;
        localStorage.setItem('token', response.token);
        console.log(response);
        this.authService.currentUserSignal.set(response);
        this.router.navigateByUrl('/');
      });
  }
}
