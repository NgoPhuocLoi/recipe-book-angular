import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData || new Date(userData.tokenExpiredDate) < new Date())
    return router.parseUrl('/auth');

  return true;
};
