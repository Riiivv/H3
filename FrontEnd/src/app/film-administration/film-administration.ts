import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Services } from '../services/services';
import { Film } from '../interfaces/film';

@Component({
  selector: 'app-film-administration',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './film-administration.html',
  styleUrl: './film-administration.css',
})
export class FilmAdministation implements OnInit {
  constructor(private filmService: Services) {}

  filmsForm: FormGroup = new FormGroup({
    FilmId: new FormControl<number | null>(null),
    Title: new FormControl(''),
    ReleaseDate: new FormControl(''),
    Genre: new FormControl('')
  });

  FormsmoduleVariable: string = '';

  FilmList: Film[] = [];

  ngOnInit(){
    this.filmService.getFilms().subscribe(data => (this.FilmList = data));
  }

  AddFilm():void {
    if  (this.filmsForm.valid){
      const newFilm = this.filmsForm.value as Film
      this.filmService.postFilm(newFilm);
  }
  }
}