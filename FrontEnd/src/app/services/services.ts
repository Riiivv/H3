import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Film } from '../interfaces/film';

@Injectable({
  providedIn: 'root'
})
export class Services {
private filmfield: Film[] = [
  { FilmId: 1, Title: 'Inception',   ReleaseYear: 2025, Genre: 'comedy', imageUrl: 'assets/inception.jpg' },
  { FilmId: 2, Title: 'The Matrix',  ReleaseYear: 2024, Genre: 'action', imageUrl: 'assets/matrix.jpg' },
  { FilmId: 3, Title: 'Interstellar',ReleaseYear: 2023, Genre: 'drama',  imageUrl: 'assets/interstellar.jpg' },
];


  private film$ = new BehaviorSubject<Film[]>(this.filmfield);

  getFilms(): Observable<Film[]> {
    return this.film$.asObservable();
  }

  postFilm(film: Film) {
    film.FilmId = this.filmfield.length ? Math.max(...this.filmfield.map(f => f.FilmId)) + 1 : 1;
    this.filmfield.push(film);
    this.film$.next(this.filmfield);
  }

  deleteFilm(filmId: number) {
    return filmId;
  }

  putFilm(filmId: number)
  {

  }
}