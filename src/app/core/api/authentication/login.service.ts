import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserLoginResponse } from '../authentication/user.login.response';
import { UserLoginRequest } from '../authentication/user.login.request';
import { environment } from '../../../../environments/environment';
import { AuthService } from './auth.service';
import { ApiErrorResponse } from '../shared/api.error.response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  login(request: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${environment.backendUrl}/Authentication`, request)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.authService.currentUserSignal.set(response);
        }),
        catchError((httpError: HttpErrorResponse) => {
          let errorMessage = "Erro inesperado";

          if (httpError.error && (httpError.error as ApiErrorResponse).detail) {
            errorMessage = (httpError.error as ApiErrorResponse).detail;
          }

          return throwError(() => errorMessage);
        })
      );
  }
}