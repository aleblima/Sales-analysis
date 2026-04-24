import { Injectable } from '@angular/core';
import { apiUrl } from '../../enviroment';
import { HttpClient } from '@angular/common/http';
import { Seller } from './seller-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {

  private url = `${apiUrl}/sellers`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.url);
  }

  create(name: string, regionId: number): Observable<Seller> {
    return this.http.post<Seller>(this.url, { name, regionId });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
