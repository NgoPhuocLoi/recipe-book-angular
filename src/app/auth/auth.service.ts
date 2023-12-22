import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private REGISTER_URL =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChRKQlScMdohS4_4fDqtvFAG91f4S8ChI';
  private http = inject(HttpClient);
  private AUTH_ERROR_MESSAGE = {
    EMAIL_EXISTS: 'This email has already existed!',
    DEFAULT: 'An error has occured!',
  };

  register(userInfo: { email: string; password: string }) {
    return this.http
      .post(this.REGISTER_URL, {
        ...userInfo,
        returnSecureToken: true,
      })
      .pipe(
        catchError((err) => {
          const errorMsgCode = err.error?.error?.message || 'DEFAULT';
          return throwError(
            () => new Error(this.AUTH_ERROR_MESSAGE[errorMsgCode])
          );
        })
      );
  }
}
