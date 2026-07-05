import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CreatePostRequest as CreatePostRequest } from './post.create.request';
import { environment } from '../../../../environments/environment';
import { ApiErrorResponse } from '../shared/api.error.response';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private readonly http = inject(HttpClient);

    createPost(createPostRequest: CreatePostRequest): Observable<string> {
        return this.http.post<string>(`${environment.backendUrl}/posts/create`, createPostRequest)
            .pipe(
                tap(() => {
                    return 'Success';
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