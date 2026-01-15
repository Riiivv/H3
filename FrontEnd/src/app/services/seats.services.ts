import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeatsDTORequest, SeatsDTOResponse } from '../interfaces/seats.dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeatsService {
private readonly baseUrl = `${environment.apiBaseUrl}/api/Seats`;


    constructor(private http: HttpClient) {}

    getAll(): Observable<SeatsDTOResponse[]> {
        return this.http.get<SeatsDTOResponse[]>(this.baseUrl);
    }
    getById(id: number): Observable<SeatsDTOResponse> {
        return this.http.get<SeatsDTOResponse>(`${this.baseUrl}/${id}`);
    }
    create(body: SeatsDTORequest): Observable<SeatsDTOResponse> {
        return this.http.post<SeatsDTOResponse>(this.baseUrl, body);
    }
    update(id: number, body: SeatsDTORequest): Observable<SeatsDTOResponse> {
        return this.http.put<SeatsDTOResponse>(`${this.baseUrl}/${id}`, body);
    }
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}