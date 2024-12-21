import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeyclockService } from 'src/app/services/keyclock.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  constructor(
    private router: Router,
    private keyclockService: KeyclockService
  ) {}
  async logout() {
    this.keyclockService.logout();
  }
}
