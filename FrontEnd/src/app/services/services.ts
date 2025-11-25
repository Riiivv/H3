import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Film } from '../interfaces/film';

@Injectable({
  providedIn: 'root'
})
export class Services {
private filmfield: Film[] = [
  {
    FilmId: 1,
    Title: 'Inception',
    ReleaseYear: 2025,
    Genre: 'Comedy',
    imageUrl: 'https://via.placeholder.com/300x450?text=Inception'
  },
  {
    FilmId: 2,
    Title: 'The Matrix',
    ReleaseYear: 2024,
    Genre: 'Action',
    imageUrl: 'https://via.placeholder.com/300x450?text=Matrix'
  },
  {
    FilmId: 3,
    Title: 'Interstellar',
    ReleaseYear: 2023,
    Genre: 'Drama',
    imageUrl: 'https://via.placeholder.com/300x450?text=Interstellar'
  }
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