import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviesDTORequest, MoviesDTOResponse } from '../interfaces/movies.dto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/Movies`;

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<MoviesDTOResponse[]> {
    return this.http.get<MoviesDTOResponse[]>(this.baseUrl);
  }

  getMovieById(id: number): Observable<MoviesDTOResponse> {
    return this.http.get<MoviesDTOResponse>(`${this.baseUrl}/${id}`);
  }

  // POST: DTO direkte
  createMovie(dto: MoviesDTORequest): Observable<MoviesDTOResponse> {
    return this.http.post<MoviesDTOResponse>(this.baseUrl, dto);
  }

  // PUT: DTO direkte
  updateMovie(id: number, dto: MoviesDTORequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, dto);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
