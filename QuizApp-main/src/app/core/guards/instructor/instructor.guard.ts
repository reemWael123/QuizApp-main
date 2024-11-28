import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const instructorGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('userToken');
  const role = localStorage.getItem('role');
  const _Router = inject(Router);
  if (token !== null && role === 'Instructor') {
    return true;
  } else {
    _Router.navigate(['/auth/login']);
    return false;
  }
};
