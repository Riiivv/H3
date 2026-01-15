import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketDTORequest, TicketDTOResponse } from '../interfaces/tickets.dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TicketsService {
private readonly baseUrl = `${environment.apiBaseUrl}/api/Tickets`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TicketDTOResponse[]> {
    return this.http.get<TicketDTOResponse[]>(this.baseUrl);
  }

  getById(id: number): Observable<TicketDTOResponse> {
    return this.http.get<TicketDTOResponse>(`${this.baseUrl}/${id}`);
  }

  getByMovie(movieId: number): Observable<TicketDTOResponse[]> {
    return this.http.get<TicketDTOResponse[]>(`${this.baseUrl}/byMovie/${movieId}`);
  }

  getBySeat(seatId: number): Observable<TicketDTOResponse[]> {
    return this.http.get<TicketDTOResponse[]>(`${this.baseUrl}/bySeat/${seatId}`);
  }

  create(body: TicketDTORequest): Observable<TicketDTOResponse> {
    return this.http.post<TicketDTOResponse>(this.baseUrl, body);
  }

  update(id: number, body: TicketDTORequest): Observable<TicketDTOResponse> {
    return this.http.put<TicketDTOResponse>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}