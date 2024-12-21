import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/Review.model';  // Modèle Review (assurez-vous que le fichier est correct)

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:5000/api/submissions'; 

  constructor(private http: HttpClient) { }

  // Récupérer toutes les soumissions
  getAllReviews(): Observable<Review[]> {  
    return this.http.get<Review[]>(this.apiUrl);
  }

  // Supprimer une soumission par ID
  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
