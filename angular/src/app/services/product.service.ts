import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { KeyclockService } from './keyclock.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private userToken: string | undefined;
  private apiUrl = 'http://localhost:8082/api/boycott/products';

  constructor(private http: HttpClient, private keyclock: KeyclockService) {
    this.userToken = this.keyclock.getToken();
  }

  getAllProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.get<Product[]>(`${this.apiUrl}/byCategory/${categoryId}`, { headers });
  }

  getProductById(id: number): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }

  addProduct(product: Product, idCategory: number): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.post<Product>(
      `${this.apiUrl}?idCategory=${idCategory}`,
      product,
      { headers }
    );
  }

  updateProduct(
    id: number,
    updatedProduct: Product,
    idCategory: number
  ): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.put<Product>(
      `${this.apiUrl}/${id}?idCategory=${idCategory}`,
      updatedProduct,
      { headers }
    );
  }

  deleteProduct(id: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userToken,
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}



