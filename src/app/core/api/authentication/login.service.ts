import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserLoginResponse } from '../authentication/user.login.response';
import { UserLoginRequest } from '../authentication/user.login.request';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth.service';

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
        })
      );
  }
}