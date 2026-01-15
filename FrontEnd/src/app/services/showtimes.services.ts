import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowTimesDTORequest, ShowtimesDTOResponse } from '../interfaces/showtimes.dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ShowtimesService {
private readonly baseUrl = `${environment.apiBaseUrl}/api/Showtimes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ShowtimesDTOResponse[]> {
    return this.http.get<ShowtimesDTOResponse[]>(this.baseUrl);
  }

  getById(id: number): Observable<ShowtimesDTOResponse> {
    return this.http.get<ShowtimesDTOResponse>(`${this.baseUrl}/${id}`);
  }

  getByMovie(movieId: number): Observable<ShowtimesDTOResponse[]> {
    return this.http.get<ShowtimesDTOResponse[]>(`${this.baseUrl}/byMovie/${movieId}`);
  }

  getByHall(hallId: number): Observable<ShowtimesDTOResponse[]> {
    return this.http.get<ShowtimesDTOResponse[]>(`${this.baseUrl}/byHall/${hallId}`);
  }

  create(body: ShowTimesDTORequest): Observable<ShowtimesDTOResponse> {
    return this.http.post<ShowtimesDTOResponse>(this.baseUrl, body);
  }

  update(id: number, body: ShowTimesDTORequest): Observable<ShowtimesDTOResponse> {
    return this.http.put<ShowtimesDTOResponse>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}