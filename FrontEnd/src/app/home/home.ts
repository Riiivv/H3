import { NgForOf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgForOf, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  dates = [
    { dayName: 'MAN', date: 24, month: 'NOV' },
    { dayName: 'TIR', date: 25, month: 'NOV' },
    { dayName: 'ONS', date: 26, month: 'NOV' },
    { dayName: 'TOR', date: 27, month: 'NOV' },
    { dayName: 'FRE', date: 28, month: 'NOV' },
    { dayName: 'LØR', date: 29, month: 'NOV' },
    { dayName: 'SØN', date: 30, month: 'NOV' },
  ];

  genres = ['Alle','Action','Adventure','Animation','Comedy','Crime','Documentary','Drama','Family','Fantasy','History','Horror','Mystery','Romance','Science Fiction','Thriller','War','Western',];

  activeGenre = 'Alle';

films: any[] = [
    { title: 'Film 1', genre: 'Sci-Fi', imageUrl: 'assets/film1.jpg' },
    { title: 'Film 2', genre: 'Drama', imageUrl: 'assets/film2.jpg' },
    { title: 'Film 3', genre: 'Thriller', imageUrl: 'assets/film3.jpg' },
    { title: 'Film 4', genre: 'Sci-Fi', imageUrl: 'assets/film4.jpg' },
    { title: 'Film 5', genre: 'Drama', imageUrl: 'assets/film5.jpg' },
  ];
}
