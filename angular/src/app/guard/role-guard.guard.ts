import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeyclockService } from '../services/keyclock.service';

// @Injectable({ providedIn: 'root' })
// export class roleGuardGuard implements CanActivate {
//   constructor(
//     private KeyclockService: KeyclockService,
//     private router: Router
//   ) {}

//   async canActivate(): Promise<boolean> {
//     // Récupérer les rôles de l'utilisateur connecté
//     const userRoles = await this.KeyclockService.getUserRoles();

//     // Vérifier si l'utilisateur a le rôle 'admin'
//     if (userRoles.includes('ADMIN')) {
//       return true; // L'utilisateur peut accéder à la route
//     } else if (userRoles.includes('USER')) {
//       // Vérifier si la route actuelle est sous '/user' pour permettre l'accès
//       const currentRoute = this.router.url;
//       if (currentRoute.startsWith('/user')) {
//         return true; // L'utilisateur peut accéder aux routes sous '/user'
//       }
//       // Si l'utilisateur n'est pas autorisé à accéder à cette route, rediriger vers '/user'
//       this.router.navigate(['/user']);
//       return false;
//     } else {
//       // Si l'utilisateur n'a pas de rôle valide, on redirige vers la page d'accueil ou d'erreur
//       this.router.navigate(['/home']);
//       return false;
//     }
//   }
// }

@Injectable({ providedIn: 'root' })
export class roleGuardGuard implements CanActivate {
  constructor(
    private KeyclockService: KeyclockService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    // Récupérer les rôles de l'utilisateur connecté
    const userRoles = await this.KeyclockService.getUserRoles();

    // Vérifier si l'utilisateur a le rôle 'admin'
    if (userRoles.includes('ADMIN')) {
      return true; // L'utilisateur peut accéder à la route 'admin'
    }

    // Si l'utilisateur a le rôle 'USER'
    if (userRoles.includes('USER')) {
      const currentRoute = this.router.url;

      // Si la route commence par '/user', l'utilisateur peut y accéder
      if (currentRoute.startsWith('/user')) {
        return true; // L'utilisateur peut accéder à toutes les routes sous '/user'
      }

      // Si l'utilisateur n'a pas accès à cette route, rediriger vers '/user'
      this.router.navigate(['/user']);
      return false;
    }

    // Si l'utilisateur n'a pas de rôle valide, rediriger vers la page d'accueil
    this.router.navigate(['/home']);
    return false;
  }
}
