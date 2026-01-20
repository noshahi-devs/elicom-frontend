import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface Category {
  name: string;
  slug: string;
  imageUrl: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  categoryId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:44311/api/services/app/Category';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetAll`)
      .pipe(
        map(res => {
          console.log('Category/GetAll Raw:', res);
          if (res && res.result) {
            if (Array.isArray(res.result)) return res.result;
            if (res.result.items && Array.isArray(res.result.items)) return res.result.items;
          }
          return [];
        }),
        catchError(err => {
          console.error('GetAllCategories Network Error:', err);
          return of([]);
        })
      );
  }

  getHomepageCategories(): Observable<any[]> {
    return this.http.get<any>('https://localhost:44311/api/services/app/Homepage/GetCategoriesWithListedProducts')
      .pipe(
        map(res => {
          console.log('Homepage Categories Raw:', res);
          if (res && res.result) {
            if (Array.isArray(res.result)) return res.result;
            if (res.result.items && Array.isArray(res.result.items)) return res.result.items;
          }
          return Array.isArray(res) ? res : [];
        }),
        catchError(err => {
          console.error('getHomepageCategories Network Error:', err);
          return of([]);
        })
      );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<any>(`${this.apiUrl}/Get?id=${id}`)
      .pipe(map(res => res.result)); // returns single Category object
  }
}
