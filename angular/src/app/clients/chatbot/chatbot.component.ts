import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userInput: string = ''; // User input
  chatHistory: { message: string, type: 'user' | 'bot' }[] = []; // Message history
  loading: boolean = false; // Loading state
  isVisible: boolean = false; // Whether the chatbot is visible

  constructor(private chatbotService: ChatbotService) {}

  // Toggle the visibility of the chatbot
  toggleChatbot() {
    this.isVisible = !this.isVisible;
  }

  // Handle the form submission
  onSubmit(): void {
    const cleanedInput = this.userInput.trim();
    if (!cleanedInput) return;

    this.chatHistory.push({ message: cleanedInput, type: 'user' });
    this.userInput = '';
    this.loading = true;

    // Get the bot's response
    this.chatbotService.getResponse(cleanedInput).subscribe({
      next: (response: { response: string }) => {
        this.chatHistory.push({ message: response.response, type: 'bot' });
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error with chatbot:', err);
        this.chatHistory.push({
          message: 'Sorry, something went wrong. Please try again later.',
          type: 'bot'
        });
        this.loading = false;
      }
    });
  }
}
