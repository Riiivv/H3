import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
private filmfield: Film[] = [
  { filmId: 1, title: 'Inception', releasedate: 2025, genre: 'comedy'},
  { filmId: 2, title: 'The Matrix', releasedate: 2024, genre: 'action'},
  { filmId: 3, title: 'Interstellar', releasedate: 2023, genre: 'drama'},

]


private film = new BehaviorSubject<Film[]>(this.filmfield);

  getFilms(){
    return this.film.asObservable();
  }
}