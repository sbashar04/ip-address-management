import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  authService.finalizeLogout();

  Swal.fire({
    title: 'Warning!',
    text: 'Authorization Error. Login first.',
    icon: 'error',
    confirmButtonText: 'Login'
  }).then(() => {
    router.navigate(['login']);
  });

  return false;
}
