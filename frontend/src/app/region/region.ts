import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from './region-model';
import { apiUrl } from '../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class RegionService {

  private url = `${apiUrl}/regions`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Region[]> {
    return this.http.get<Region[]>(this.url);
  }

  create(name: string): Observable<Region> {
    return this.http.post<Region>(this.url, { name })
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
