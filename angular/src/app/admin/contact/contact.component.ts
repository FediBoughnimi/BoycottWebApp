import { Component, OnInit } from '@angular/core';
import { ContactMessageService } from '../../services/contact-admin.service';
import { ContactAdmin } from '../../models/contact-admin.model';

@Component({
  selector: 'app-contact-messages',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactMessagesComponent implements OnInit {
  messages: ContactAdmin[] = [];
  loading = false;

  constructor(private messageService: ContactMessageService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  // Récupérer les messages
  fetchMessages(): void {
    this.loading = true;
    this.messageService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des messages :', error);
        this.loading = false;
      },
    });
  }

  // Supprimer un message
  deleteMessage(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
      this.messageService.deleteMessage(id).subscribe({
        next: () => {
          this.messages = this.messages.filter((msg) => msg._id !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du message :', error);
        },
      });
    }
  }
  
}
