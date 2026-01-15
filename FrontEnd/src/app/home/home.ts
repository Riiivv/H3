import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MoviesService } from '../services/movies.services';
import { MoviesDTOResponse } from '../interfaces/movies.dto';

type FilmVM = {
  FilmId: number;
  Title: string;
  Genre: string;
  ReleaseYear: number;
  imageUrl: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  isGenreOpen = false;
  activeGenre: string = 'All Movies';

  genres: string[] = ['All Movies'];
  films: FilmVM[] = [];
  filteredFilms: FilmVM[] = [];

  private sub?: Subscription;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadMovies();
    }

    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (!isPlatformBrowser(this.platformId)) return;

        const url = this.router.url.split('?')[0];
        if (url === '/' || url === '/home') {
          this.loadMovies();
        }
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  selectGenre(g: string) {
    this.activeGenre = g;
    this.isGenreOpen = false;
    this.applyFilter();
    this.cdr.detectChanges(); // zoneless: opdater UI nu
  }

  private loadMovies(): void {
    this.moviesService.getAllMovies().subscribe((data: MoviesDTOResponse[]) => {
      this.films = data.map((m) => ({
        FilmId: m.moviesId,
        Title: m.title,
        Genre: m.genre,
        ReleaseYear: new Date(m.releaseDate).getFullYear(),
        imageUrl: `https://picsum.photos/300/450?random=${m.moviesId}`,
      }));

      const uniqueGenres = Array.from(new Set(this.films.map((f) => f.Genre))).sort();
      this.genres = ['All Movies', ...uniqueGenres];

      this.applyFilter();

      this.cdr.detectChanges(); // zoneless: det er den vigtige linje
    });
  }

  private applyFilter(): void {
    this.filteredFilms =
      !this.activeGenre || this.activeGenre === 'All Movies'
        ? this.films
        : this.films.filter((f) => f.Genre === this.activeGenre);
  }
}
