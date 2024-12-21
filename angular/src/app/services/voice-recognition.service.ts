import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  private recognition: any;

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('Web Speech API non supportée dans ce navigateur');
    } else {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  startRecognition(): Observable<string> {
    return new Observable<string>((observer) => {
      this.recognition.start();

      this.recognition.onresult = (event: any) => {
        const transcript: string = event.results[0][0].transcript;
        observer.next(transcript);
      };

      this.recognition.onerror = (event: any) => {
        observer.error(event.error);
      };
    });
  }

  stopRecognition(): void {
    this.recognition.stop();
  }
}
