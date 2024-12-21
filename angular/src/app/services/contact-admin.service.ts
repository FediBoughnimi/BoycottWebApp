import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactAdmin } from '../models/contact-admin.model';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageService {
  private apiUrl = 'http://localhost:3030/contact/messages'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les messages
  getMessages(): Observable<ContactAdmin[]> {
    return this.http.get<ContactAdmin[]>(this.apiUrl);
  }

  // Supprimer un message par ID
  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
