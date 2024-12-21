import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageCategory } from '../models/imageCategory.model';
import { KeyclockService } from './keyclock.service';

@Injectable({
  providedIn: 'root',
})
export class ImageCategoryService {
  private userToken: string | undefined;

  private apiUrl = 'http://localhost:8082/api/boycott/imageCategory';

  constructor(private http: HttpClient, private keyclock: KeyclockService) {this.userToken = this.keyclock.getToken();}

  uploadImage(file: File, idCategory: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    const formData: FormData = new FormData();
    formData.append('imageFile', file);

    return this.http.post<string>(
      `${this.apiUrl}/upload/${idCategory}`,
      formData,
      { headers }
    );
  }

  getImageByCategoryId(idCategory: number): Observable<ImageCategory> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.get<ImageCategory>(`${this.apiUrl}/get/${idCategory}`, {
      headers,
    });
  }

  updateImage(file: File, idCategory: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    const formData: FormData = new FormData();
    formData.append('imageFile', file);

    return this.http.put<string>(
      `${this.apiUrl}/update/${idCategory}`,
      formData,
      { headers }
    );
  }

  deleteImage(idCategory: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.delete<string>(`${this.apiUrl}/delete/${idCategory}`, {
      headers,
    });
  }
}