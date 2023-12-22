import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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

  switchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (!this.authForm.valid) return;

    this.loading = true;
    if (this.isLogin) {
    } else {
      this.authService.register(this.authForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err.message);
          this.errorMessage = err.message;
        },
      });
    }
    this.loading = false;

    this.authForm.reset();
  }
}
