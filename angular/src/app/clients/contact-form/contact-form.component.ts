import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service'; // importation du service

@Component({
  selector: 'app-contact',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  statusMessage: string = '';  // Message à afficher après l'envoi du message
  messageType: string = '';    // Message type (success/error)

  constructor(private contactService: ContactService) {}

  onSubmit() {
    this.contactService.sendMessage(this.form).subscribe(
      (response) => {
        console.log('Message sent successfully:', response);
        this.statusMessage = 'Your message has been sent successfully!';
        this.messageType = 'success';  // Set the message type to success
        this.resetForm();
      },
      (error) => {
        console.error('Error sending message:', error);
        this.statusMessage = 'There was an error sending your message. Please try again later.';
        this.messageType = 'error';  // Set the message type to error
      }
    );
  }

  resetForm() {
    this.form = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }
}
