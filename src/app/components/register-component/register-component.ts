import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { UserRegisterRequest } from '../../core/api/register/user.register.request';
import { environment } from '../../../environments/environment';
import { UserSessionResponse } from '../../core/api/session/user.session.response';
import PasswordValidator from '../../shared/validators/password-validator.validator';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register-component',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
  standalone: true
})
export class RegisterComponent {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

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

    this.http.post(`${environment.backendUrl}/register`, userRegisterRequest)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          alert('Registro feito com sucesso!');
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.log(err);
          alert('Erro ao fazer o registro!');
        }
      });
  }
}
