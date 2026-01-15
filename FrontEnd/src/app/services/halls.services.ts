import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HallsDTORequest, HallsDTOResponse } from '../interfaces/halls.dto';
import { env } from 'process';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HallsService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/Halls`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<HallsDTOResponse[]> {
    return this.http.get<HallsDTOResponse[]>(this.baseUrl);
  }

  getById(id: number): Observable<HallsDTOResponse> {
    return this.http.get<HallsDTOResponse>(`${this.baseUrl}/${id}`);
  }

  create(body: HallsDTORequest): Observable<HallsDTOResponse> {
    return this.http.post<HallsDTOResponse>(this.baseUrl, body);
  }

  update(id: number, body: HallsDTORequest): Observable<HallsDTOResponse> {
    return this.http.put<HallsDTOResponse>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}