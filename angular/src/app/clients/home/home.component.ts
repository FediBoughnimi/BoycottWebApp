import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Utilisation d'un boolean pour contrôler la visibilité
  isVisible: boolean = false;

  toggleChatbot() {
    this.isVisible = !this.isVisible; // Alterne l'état visible/invisible
    if (this.isVisible) {
      this.playWelcomeAudio(); // Joue le son si le chatbot devient visible
    }
  }

  playWelcomeAudio() {
    const audioElement = document.getElementById('welcomeAudio') as HTMLAudioElement;
    if (audioElement) {
      audioElement.play().catch((error) => {
        console.error('Impossible de jouer le son:', error);
      });
    }
  }
  loginWithKeycloak() {
    const keycloakUrl =
      'http://localhost:8180/realms/myrealm/protocol/openid-connect/auth';
    const clientId = 'boycottApp';
    const redirectUri = encodeURIComponent('http://localhost:4200/login');
    const state = 'cdaa394c-6422-460d-9582-2f87b8ee9662'; // Vous pouvez générer un state dynamique si nécessaire
    const responseMode = 'fragment';
    const responseType = 'code';
    const scope = 'openid';
    const nonce = 'c631214a-a8a6-441b-ac0d-99ca18928741'; // Utilisez un nonce unique pour chaque demande
    const codeChallenge = 'lTXt9IqudqG57qVtyJ5bKdWwCeZ16Jv-_Wjo6nxsiu8'; // Générer un code challenge si nécessaire
    const codeChallengeMethod = 'S256';

    // Crée l'URL de redirection complète
    const loginUrl = `${keycloakUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&response_mode=${responseMode}&response_type=${responseType}&scope=${scope}&nonce=${nonce}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;

    // Redirige vers l'URL de connexion Keycloak
    window.location.href =
      'http://localhost:8180/realms/myrealm/protocol/openid-connect/auth?client_id=boycottApp&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fadmin&state=cdaa394c-6422-460d-9582-2f87b8ee9662&response_mode=fragment&response_type=code&scope=openid&nonce=c631214a-a8a6-441b-ac0d-99ca18928741&code_challenge=lTXt9IqudqG57qVtyJ5bKdWwCeZ16Jv-_Wjo6nxsiu8&code_challenge_method=S256';
  }
}
