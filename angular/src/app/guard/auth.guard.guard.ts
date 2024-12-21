// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { TokenService } from '../services/token.service';
// import { Router } from '@angular/router';
// import { KeyclockService } from '../services/keyclock.service';

// export const authGuard: CanActivateFn = () => {
//   const tokenService = inject(KeyclockService);
//   const router = inject(Router);
//   if (tokenService.keycloak.isTokenExpired()) {
//     router.navigate(['login']);
//     return false;
//   }
//   return true;
// };

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeyclockService } from '../services/keyclock.service';

export const authGuard: CanActivateFn = () => {
  const keyclockService = inject(KeyclockService);
  const router = inject(Router);

  if (!keyclockService.isLoggedIn()) {
    router.navigate([
      '',
    ]);
    return false;
  }

  return true;
};
