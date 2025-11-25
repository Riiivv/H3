import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Film } from '../interfaces/film';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
private filmfield: Film[] = [
  { FilmId: 1, Title: 'Inception', ReleaseYear: 2025, Genre: 'comedy'},
  { FilmId: 2, Title: 'The Matrix', ReleaseYear: 2024, Genre: 'action'},
  { FilmId: 3, Title: 'Interstellar', ReleaseYear: 2023, Genre: 'drama'},

]


  private film$ = new BehaviorSubject<Film[]>(this.filmfield);

  getFilms(): Observable<Film[]> {
    return this.film$.asObservable();
  }

  postFilm(film: Film) {
    film.FilmId = this.filmfield.length ? Math.max(...this.filmfield.map(f => f.FilmId)) + 1 : 1;
    this.filmfield.push(film);
    this.film$.next(this.filmfield);
  }
}