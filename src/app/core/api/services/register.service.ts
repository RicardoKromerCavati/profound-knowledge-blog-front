import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserRegisterRequest } from '../register/user.register.request';
import { environment } from '../../../../environments/environment';
import { UserRegisterResponse } from '../register/user.register.response';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    private readonly http = inject(HttpClient);

    register(userRegisterRequest: UserRegisterRequest): Observable<UserRegisterResponse> {
        return this.http.post<UserRegisterResponse>(`${environment.backendUrl}/register`, userRegisterRequest);
    }
}