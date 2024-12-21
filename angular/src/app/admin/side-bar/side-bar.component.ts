import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeyclockService } from 'src/app/services/keyclock.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  productsMenuOpen = false;
  categoriesMenuOpen = false;
  constructor(
    private router: Router,
    private keyclockService: KeyclockService
  ) {}

  toggleProductsMenu(): void {
    this.productsMenuOpen = !this.productsMenuOpen;
  }

  toggleCategoriesMenu(): void {
    this.categoriesMenuOpen = !this.categoriesMenuOpen;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  async logout() {
    this.keyclockService.logout();
  }
}
