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
      imageUrl: 'https://picsum.photos/300/450?random=1',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00', '23:00'] },
        { hall: 'Sal 2', times: ['11:30', '14:30', '17:30'] },
        { hall: 'Sal 3', times: ['13:00', '16:00', '19:00'] },
        { hall: 'Sal 4', times: ['10:00', '13:30', '21:30'] },
        { hall: 'Sal 5', times: ['20:00', '22:30'] }
      ]
    },
    {
      FilmId: 2,
      Title: 'The Matrix',
      ReleaseYear: 2024,
      Genre: 'Action',
      imageUrl: 'https://picsum.photos/300/450?random=2',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '17:00', '21:00'] },
        { hall: 'Sal 2', times: ['11:00', '14:00', '18:30'] },
        { hall: 'Sal 3', times: ['13:30', '16:30', '20:30'] },
        { hall: 'Sal 4', times: ['10:30', '19:00'] },
        { hall: 'Sal 5', times: ['22:15'] }
      ]
    },
    {
      FilmId: 3,
      Title: 'Interstellar',
      ReleaseYear: 2023,
      Genre: 'Drama',
      imageUrl: 'https://picsum.photos/300/450?random=3',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00', '22:00'] },
        { hall: 'Sal 2', times: ['11:15', '14:15', '17:15'] },
        { hall: 'Sal 3', times: ['13:45', '16:45', '20:45'] },
        { hall: 'Sal 4', times: ['19:30'] },
        { hall: 'Sal 5', times: ['21:30'] }
      ]
    },

    {
      FilmId: 4,
      Title: 'The Silent Forest',
      ReleaseYear: 2022,
      Genre: 'Mystery',
      imageUrl: 'https://picsum.photos/300/450?random=4',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00', '23:30'] },
        { hall: 'Sal 2', times: ['11:00', '14:00', '17:00'] },
        { hall: 'Sal 3', times: ['13:15', '16:15', '19:15'] },
        { hall: 'Sal 4', times: ['20:30'] },
        { hall: 'Sal 5', times: ['22:45'] }
      ]
    },
    {
      FilmId: 5,
      Title: 'Galactic Wars',
      ReleaseYear: 2026,
      Genre: 'Sci-Fi',
      imageUrl: 'https://picsum.photos/300/450?random=5',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00', '00:00'] },
        { hall: 'Sal 2', times: ['11:30', '14:30', '17:30'] },
        { hall: 'Sal 3', times: ['13:00', '16:00', '19:00'] },
        { hall: 'Sal 4', times: ['21:00'] },
        { hall: 'Sal 5', times: ['23:30'] }
      ]
    },
    {
      FilmId: 6,
      Title: 'Lost in Time',
      ReleaseYear: 2021,
      Genre: 'Sci-Fi',
      imageUrl: 'https://picsum.photos/300/450?random=6',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00', '00:00'] },
        { hall: 'Sal 2', times: ['11:00', '14:00', '17:00'] },
        { hall: 'Sal 3', times: ['13:30', '16:30', '19:30'] },
        { hall: 'Sal 4', times: ['21:15'] },
        { hall: 'Sal 5', times: ['23:45'] }
      ]
    },
    {
      FilmId: 7,
      Title: 'The Last Kingdom',
      ReleaseYear: 2019,
      Genre: 'Action',
      imageUrl: 'https://picsum.photos/300/450?random=7',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00', '00:00'] },
        { hall: 'Sal 2', times: ['10:30', '13:30', '16:30'] },
        { hall: 'Sal 3', times: ['19:00', '21:30'] },
        { hall: 'Sal 4', times: ['11:45', '14:45'] },
        { hall: 'Sal 5', times: ['23:00'] }
      ]
    },
    {
      FilmId: 8,
      Title: 'Moonrise Echo',
      ReleaseYear: 2022,
      Genre: 'Drama',
      imageUrl: 'https://picsum.photos/300/450?random=8',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['11:15', '14:15', '17:15'] },
        { hall: 'Sal 3', times: ['19:00'] },
        { hall: 'Sal 4', times: ['20:30'] },
        { hall: 'Sal 5', times: ['22:00'] }
      ]
    },
    {
      FilmId: 9,
      Title: 'Crimson River',
      ReleaseYear: 2020,
      Genre: 'Thriller',
      imageUrl: 'https://picsum.photos/300/450?random=9',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['11:30', '14:30', '17:30'] },
        { hall: 'Sal 3', times: ['19:00', '21:30'] },
        { hall: 'Sal 4', times: ['20:00'] },
        { hall: 'Sal 5', times: ['22:30'] }
      ]
    },
    {
      FilmId: 10,
      Title: 'Bright Souls',
      ReleaseYear: 2024,
      Genre: 'Comedy',
      imageUrl: 'https://picsum.photos/300/450?random=10',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['10:45', '13:45', '16:45'] },
        { hall: 'Sal 3', times: ['19:15'] },
        { hall: 'Sal 4', times: ['20:45'] },
        { hall: 'Sal 5', times: ['22:15'] }
      ]
    },

    {
      FilmId: 11,
      Title: 'Neon Horizon',
      ReleaseYear: 2025,
      Genre: 'Sci-Fi',
      imageUrl: 'https://picsum.photos/300/450?random=11',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['11:30', '14:30', '17:30'] },
        { hall: 'Sal 3', times: ['19:00', '21:30'] },
        { hall: 'Sal 4', times: ['20:30'] },
        { hall: 'Sal 5', times: ['23:00'] }
      ]
    },
    {
      FilmId: 12,
      Title: 'Cold Nights',
      ReleaseYear: 2018,
      Genre: 'Drama',
      imageUrl: 'https://picsum.photos/300/450?random=12',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['11:15', '14:15', '17:15'] },
        { hall: 'Sal 3', times: ['19:00'] },
        { hall: 'Sal 4', times: ['20:30'] },
        { hall: 'Sal 5', times: ['22:00'] }
      ]
    },
    {
      FilmId: 13,
      Title: 'Shadowfall',
      ReleaseYear: 2023,
      Genre: 'Thriller',
      imageUrl: 'https://picsum.photos/300/450?random=13',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['11:30', '14:30', '17:30'] },
        { hall: 'Sal 3', times: ['19:00'] },
        { hall: 'Sal 4', times: ['21:30'] },
        { hall: 'Sal 5', times: ['23:15'] }
      ]
    },
    {
      FilmId: 14,
      Title: 'The Iron Path',
      ReleaseYear: 2021,
      Genre: 'Action',
      imageUrl: 'https://picsum.photos/300/450?random=14',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['11:00', '14:00', '17:00'] },
        { hall: 'Sal 3', times: ['19:00', '21:30'] },
        { hall: 'Sal 4', times: ['20:00'] },
        { hall: 'Sal 5', times: ['22:30'] }
      ]
    },
    {
      FilmId: 15,
      Title: 'Dreamcatcher',
      ReleaseYear: 2020,
      Genre: 'Mystery',
      imageUrl: 'https://picsum.photos/300/450?random=15',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['11:00', '14:00', '17:00'] },
        { hall: 'Sal 3', times: ['19:00'] },
        { hall: 'Sal 4', times: ['21:00'] },
        { hall: 'Sal 5', times: ['23:00'] }
      ]
    },

    {
      FilmId: 16,
      Title: 'Blue Whisper',
      ReleaseYear: 2024,
      Genre: 'Drama',
      imageUrl: 'https://picsum.photos/300/450?random=16',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['11:15', '14:15', '17:15'] },
        { hall: 'Sal 3', times: ['19:00'] },
        { hall: 'Sal 4', times: ['21:00'] },
        { hall: 'Sal 5', times: ['22:30'] }
      ]
    },
    {
      FilmId: 17,
      Title: 'Urban Heat',
      ReleaseYear: 2019,
      Genre: 'Action',
      imageUrl: 'https://picsum.photos/300/450?random=17',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00'] },
        { hall: 'Sal 2', times: ['11:00', '14:00', '17:00'] },
        { hall: 'Sal 3', times: ['19:00', '21:30'] },
        { hall: 'Sal 4', times: ['20:00'] },
        { hall: 'Sal 5', times: ['23:00'] }
      ]
    },
    {
      FilmId: 18,
      Title: 'Echoes',
      ReleaseYear: 2023,
      Genre: 'Sci-Fi',
      imageUrl: 'https://picsum.photos/300/450?random=18',
      showtimes: [
        { hall: 'Sal 1', times: ['8:00', '12:00', '14:00', '23:55'] },
        { hall: 'Sal 2', times: ['11:00', '15:00'] },
        { hall: 'Sal 3', times: ['17:00', '20:00'] },
        { hall: 'Sal 4', times: ['21:30'] },
        { hall: 'Sal 5', times: ['23:30'] }
      ]
    },
    {
      FilmId: 19,
      Title: 'Fading Lights',
      ReleaseYear: 2020,
      Genre: 'Drama',
      imageUrl: 'https://picsum.photos/300/450?random=19',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00', '21:00'] },
        { hall: 'Sal 2', times: ['11:30', '14:30', '17:30'] },
        { hall: 'Sal 3', times: ['19:30'] },
        { hall: 'Sal 4', times: ['21:30'] },
        { hall: 'Sal 5', times: ['23:15'] }
      ]
    },
    {
      FilmId: 20,
      Title: 'The Unknown',
      ReleaseYear: 2022,
      Genre: 'Thriller',
      imageUrl: 'https://picsum.photos/300/450?random=20',
      showtimes: [
        { hall: 'Sal 1', times: ['12:00', '15:00', '18:00', '21:00'] },
        { hall: 'Sal 2', times: ['11:00', '14:00', '17:00'] },
        { hall: 'Sal 3', times: ['19:00', '21:30'] },
        { hall: 'Sal 4', times: ['20:00'] },
        { hall: 'Sal 5', times: ['23:00'] }
      ]
    }
  ];

  private film$ = new BehaviorSubject<Film[]>(this.filmfield);

  getFilms(): Observable<Film[]> {
    return this.film$.asObservable();
  }

  getFilmById(id: number): Film | undefined {
    return this.filmfield.find(f => f.FilmId === id);
  }

  postFilm(film: Film) {
    film.FilmId = this.filmfield.length
      ? Math.max(...this.filmfield.map(f => f.FilmId)) + 1
      : 1;
    this.filmfield.push(film);
    this.film$.next(this.filmfield);
  }

  deleteFilm(filmId: number) {
    return filmId;
  }

  putFilm(filmId: number) {

  }
}
