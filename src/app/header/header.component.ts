import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  private userSub: Subscription;
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
    localStorage.removeItem('userData');
  }

  ngOnInit() {
    this.userSub = this.authService.userSubject.subscribe((user) => {
      console.log({ user });
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
