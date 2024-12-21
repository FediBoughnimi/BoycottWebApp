import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMessage } from '../models/contact-message.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:3030/contact/send'; // URL de votre backend (modifie selon ta configuration)

  constructor(private http: HttpClient) {}

  sendMessage(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }
}
