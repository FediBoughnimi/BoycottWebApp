import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { KeyclockService } from './keyclock.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private userToken: string | undefined;
  private apiUrl = 'http://localhost:8082/api/boycott/categories';

  constructor(private http: HttpClient, private keyclock: KeyclockService) {
    this.userToken = this.keyclock.getToken();
  }

  getCategories(): Observable<Category[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.get<Category[]>(this.apiUrl, { headers });
  }

  addCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.post<Category>(this.apiUrl, category, { headers });
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category, {
      headers,
    });
  }

  deleteCategory(id: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}