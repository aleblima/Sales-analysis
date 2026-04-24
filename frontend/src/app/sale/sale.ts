import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../enviroment';
import { Sale } from './sale-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaleService {

  private url = `${apiUrl}/sales`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.url);
  }

  create(idSeller: number, total: number, date: string): Observable<Sale> {
    return this.http.post<Sale>(this.url, { idSeller, total, date });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
