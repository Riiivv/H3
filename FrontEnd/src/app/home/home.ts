import { NgForOf, NgClass, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Services } from '../services/services';
import { Film } from '../interfaces/film';
import { NgControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgForOf, NgClass, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  dates = [
    { dayName: 'MAN', date: 24, month: 'NOV' },
    { dayName: 'TIR', date: 25, month: 'NOV' },
    { dayName: 'ONS', date: 26, month: 'NOV' },
    { dayName: 'TOR', date: 27, month: 'NOV' },
    { dayName: 'FRE', date: 28, month: 'NOV' },
    { dayName: 'LØR', date: 29, month: 'NOV' },
    { dayName: 'SØN', date: 30, month: 'NOV' },
  ];

  genres = ['All','Action','Adventure','Animation','Comedy','Crime','Documentary','Drama','Family','Fantasy','History','Horror','Mystery','Romance','Science Fiction','Thriller','War','Western',];

activeGenre: string = '';
isGenreOpen: boolean = false;

  // film fra din service
  films: Film[] = [];

  constructor(private filmService: Services) {}

  ngOnInit() {
    this.filmService.getFilms().subscribe((data) => {
      this.films = data;
    });
  }

selectGenre(genre: string) {
    this.activeGenre = genre;
    this.isGenreOpen = false;
  }

// films: any[] = [
//     { title: 'Film 1', genre: 'Sci-Fi', imageUrl: 'assets/film1.jpg' },
//     { title: 'Film 2', genre: 'Drama', imageUrl: 'assets/film2.jpg' },
//     { title: 'Film 3', genre: 'Thriller', imageUrl: 'assets/film3.jpg' },
//     { title: 'Film 4', genre: 'Sci-Fi', imageUrl: 'assets/film4.jpg' },
//     { title: 'Film 5', genre: 'Drama', imageUrl: 'assets/film5.jpg' },
//   ];

get filteredFilms(): any[]{
  if (!this.activeGenre || this.activeGenre === 'All'){
    return this.films;
  }
  return this.films.filter(film => film.Genre === this.activeGenre);
}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent){
    const target = event.target as HTMLElement;

    if (target.closest('.genre-dropdown')) return;

    this.isGenreOpen = false;
  }
}