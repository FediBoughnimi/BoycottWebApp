import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from '../models/UserProfile';
@Injectable({
  providedIn: 'root',
})
export class KeyclockService {
  // isLoggedIn() {
  //   throw new Error('Method not implemented.');
  // }
  isTokenExpired() {
    throw new Error('Method not implemented.');
  }
  isLoggedIn(): boolean {
    return this.keycloak.token != null && !this.keycloak.isTokenExpired();
  }

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8180',
        realm: 'myrealm',
        clientId: 'boycottApp',
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  constructor() {}

  async init() {
    console.log('authentication the user....');
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
    });
    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token || '';
    }
  }

  async getUserRoles(): Promise<string[]> {
    try {
      // Charger le profil de l'utilisateur
      const profile = await this.keycloak.loadUserProfile();
      console.log('User profile:', profile); // Afficher le profil pour vérifier
  
      // Récupérer les rôles depuis `realm_access.roles`
      const userRoles = this.keycloak.tokenParsed?.realm_access?.roles || [];
      console.log('User roles:', userRoles); // Afficher les rôles récupérés
  
      return userRoles as string[];
    } catch (error) {
      console.error('Error fetching user roles:', error);
      return [];
    }
  }
  

  login() {
    return this.keycloak.login();
  }

  logout() {
    // this.keycloak?.accountManagement();
    return this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
  }
  getToken(): string {
    return this.keycloak.token || '';
  }
}
