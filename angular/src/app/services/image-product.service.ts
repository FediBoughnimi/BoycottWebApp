import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageProduct } from '../models/imageProduct.model';
import { KeyclockService } from './keyclock.service';

@Injectable({
  providedIn: 'root',
})
export class ImageProductService {
  private userToken: string | undefined;
  private apiUrl = 'http://localhost:8082/api/boycott/imageProduct';

  constructor(private http: HttpClient, private keyclock: KeyclockService) {this.userToken = this.keyclock.getToken();}

  uploadImage(file: File, idProduct: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    const formData: FormData = new FormData();
    formData.append('imageFile', file);

    return this.http.post<string>(
      `${this.apiUrl}/upload/${idProduct}`,
      formData,
      { headers }
    );
  }

  getImageByProductId(idProduct: number): Observable<ImageProduct> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.get<ImageProduct>(`${this.apiUrl}/get/${idProduct}`, {
      headers,
    });
  }

  updateImage(file: File, idProduct: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    const formData: FormData = new FormData();
    formData.append('imageFile', file);

    return this.http.put<string>(
      `${this.apiUrl}/update/${idProduct}`,
      formData,
      { headers }
    );
  }

  deleteImage(idProduct: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.delete<string>(`${this.apiUrl}/delete/${idProduct}`, {
      headers,
    });
  }
}



