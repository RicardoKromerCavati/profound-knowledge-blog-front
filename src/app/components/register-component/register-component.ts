import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../translate.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { UserRegisterRequest } from '../../core/api/register/user.register.request';
import { environment } from '../../../environments/environment';
import { UserSessionResponse } from '../../core/api/session/user.session.response';

@Component({
  selector: 'app-register-component',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
  standalone: true
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const formRawValues = this.form.getRawValue();

    const userRegisterRequest: UserRegisterRequest = {
      email: formRawValues.email,
      password: formRawValues.password,
      username: formRawValues.username
    };

    this.http.post(`${environment.backendUrl}/register`, userRegisterRequest)
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
