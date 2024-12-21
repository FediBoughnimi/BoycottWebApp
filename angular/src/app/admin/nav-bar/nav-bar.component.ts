import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  searchQuery: string = '';
  userName: string = 'User Name'; // Vous pouvez récupérer le nom d'utilisateur depuis votre service d'authentification

  // Fonction pour gérer la recherche
  onSearch() {
    console.log('Recherche effectuée pour :', this.searchQuery);
    // Ajoutez votre logique de recherche ici
  }
}
