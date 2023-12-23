import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogin: boolean = true;
  loading = false;
  errorMessage: string = null;
  @ViewChild('authForm', { static: true }) authForm: NgForm;
  private authService = inject(AuthService);
  private router = inject(Router);

  switchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (!this.authForm.valid) return;

    this.loading = true;
    let authObservale: Observable<any>;

    authObservale = this.isLogin
      ? this.authService.login(this.authForm.value)
      : this.authService.register(this.authForm.value);

    authObservale.subscribe({
      next: (res) => {
        console.log(res);
        if (this.isLogin) {
          this.router.navigateByUrl('/recipes');
        }
      },
      error: (err) => {
        console.log(err.message);
        this.errorMessage = err.message;
      },
    });
    this.loading = false;

    this.authForm.reset();
  }
}
