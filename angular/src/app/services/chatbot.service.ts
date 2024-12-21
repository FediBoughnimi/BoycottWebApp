import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private apiUrl = 'http://localhost:3001/chat'; // L'URL de votre backend

  constructor(private http: HttpClient) {}

  getResponse(userInput: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { userInput });
  }
}
