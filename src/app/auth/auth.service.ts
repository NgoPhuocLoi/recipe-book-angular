import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_KEY = 'AIzaSyChRKQlScMdohS4_4fDqtvFAG91f4S8ChI';
  private REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  private LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
  private http = inject(HttpClient);
  private AUTH_ERROR_MESSAGE = {
    EMAIL_EXISTS: 'This email has already existed!',
    INVALID_LOGIN_CREDENTIALS: 'Invalid email or password!',
    DEFAULT: 'An error has occured!',
  };
  private router = inject(Router);
  userSubject = new BehaviorSubject<User>(null);

  register(userInfo: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(this.REGISTER_URL, {
        ...userInfo,
        returnSecureToken: true,
      })
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  login(userInfo: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(this.LOGIN_URL, {
        ...userInfo,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          const user = new User(
            res.email,
            res.localId,
            res.idToken,
            new Date(new Date().getTime() + +res.expiresIn * 1000)
          );

          this.userSubject.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        }),
        catchError((err) => {
          return this.handleError(err);
        })
      );
  }

  logout() {
    this.userSubject.next(null);
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || new Date(userData.tokenExpiredDate) < new Date())
      return this.router.navigateByUrl('/auth');

    const user = new User(
      userData.email,
      userData.userId,
      userData._token,
      new Date(userData.tokenExpiredDate)
    );
    this.userSubject.next(user);
  }

  private handleError(err: HttpErrorResponse) {
    const errorMsgCode = err.error?.error?.message || 'DEFAULT';
    console.log({ errorMsgCode: this.AUTH_ERROR_MESSAGE[errorMsgCode] });
    return throwError(() => new Error(this.AUTH_ERROR_MESSAGE[errorMsgCode]));
  }
}
