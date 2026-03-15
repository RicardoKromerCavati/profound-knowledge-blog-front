import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

export const pageResolver: ResolveFn<Object> = (route, state) => {
   const postId = route.paramMap.get('postId');
   return of({
    postId,
    name: 'teste'
   });
};