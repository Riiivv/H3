import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MoviesService } from '../services/movies.services';
import { ShowtimesService } from '../services/showtimes.services';
import { HallsService } from '../services/halls.services';

import { MoviesDTORequest, MoviesDTOResponse } from '../interfaces/movies.dto';
import { ShowTimesDTORequest, ShowtimesDTOResponse } from '../interfaces/showtimes.dto';
import { HallsDTOResponse } from '../interfaces/halls.dto';

@Component({
  selector: 'app-film-administration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './film-administration.html',
  styleUrl: './film-administration.css',
})
export class FilmAdministration implements OnInit {
  // Movies
  movies = signal<MoviesDTOResponse[]>([]);
  editingId = signal<number | null>(null);

  // States
  loading = signal(false);
  error = signal('');
  success = signal('');

  // Showtimes (for selected movie)
  showtimes = signal<ShowtimesDTOResponse[]>([]);
  loadingShowtimes = signal(false);

  // Halls (from API)
  halls = signal<HallsDTOResponse[]>([]);

  // Movie form
  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    genre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    releaseDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    director: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  // Showtime create form
  showtimeForm = new FormGroup({
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }), // yyyy-MM-dd
    time: new FormControl('', { nonNullable: true, validators: [Validators.required] }), // HH:mm
    hallId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    price: new FormControl<number>(150, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  constructor(
    private moviesService: MoviesService,
    private showtimesService: ShowtimesService,
    private hallsService: HallsService,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadMovies();
    this.loadHalls();
  }

  // ---------- Halls ----------
  loadHalls(): void {
    this.hallsService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.halls.set(data ?? []);
        },
        error: (err) => {
          console.error('getAllHalls error', err);
        },
      });
  }

  // ---------- Movies ----------
  loadMovies(): void {
    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    this.moviesService
      .getAllMovies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.movies.set(data ?? []);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('getAllMovies error', err);
          this.error.set('Kunne ikke hente film');
          this.loading.set(false);
        },
      });
  }

  startCreate(): void {
    this.editingId.set(null);
    this.error.set('');
    this.success.set('');

    this.form.reset({ title: '', genre: '', releaseDate: '', director: '' });

    // ryd showtimes UI
    this.showtimes.set([]);
    this.showtimeForm.reset({ date: '', time: '', hallId: null, price: 150 });
  }

  startEdit(m: MoviesDTOResponse): void {
    this.editingId.set(m.moviesId);
    this.error.set('');
    this.success.set('');

    this.form.patchValue({
      title: m.title ?? '',
      genre: m.genre ?? '',
      releaseDate: this.toDateOnly(m.releaseDate),
      director: m.director ?? '',
    });

    this.loadShowtimesByMovie(m.moviesId);

    // reset showtime-form
    this.showtimeForm.reset({ date: '', time: '', hallId: null, price: 150 });
  }

  submitMovie(e?: Event): void {
    e?.preventDefault();

    this.error.set('');
    this.success.set('');

    if (this.form.invalid) {
      this.error.set('Form er ugyldig (udfyld alle felter).');
      return;
    }

    const dto: MoviesDTORequest = {
      moviesId: this.editingId() ?? 0,
      title: this.form.value.title!,
      genre: this.form.value.genre!,
      releaseDate: this.form.value.releaseDate!, // yyyy-MM-dd
      director: this.form.value.director!,
    };

    this.loading.set(true);

    const call =
      this.editingId() === null
        ? this.moviesService.createMovie(dto)
        : this.moviesService.updateMovie(this.editingId()!, dto);

    call.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(this.editingId() === null ? 'Film oprettet.' : 'Film opdateret.');
        this.startCreate();
        this.loadMovies();
      },
      error: (err) => {
        console.error('save movie error', err);
        const backendErrors = err?.error?.errors;
        this.error.set(backendErrors ? 'Validation: ' + JSON.stringify(backendErrors) : 'Kunne ikke gemme film.');
        this.loading.set(false);
      },
    });
  }

  deleteMovie(m: MoviesDTOResponse): void {
    if (!confirm(`Slet "${m.title}"?`)) return;

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    this.moviesService
      .deleteMovie(m.moviesId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.success.set('Film slettet.');
          if (this.editingId() === m.moviesId) this.startCreate();
          this.loadMovies();
        },
        error: (err) => {
          console.error('delete movie error', err);
          this.loading.set(false);
          this.error.set('Kunne ikke slette film (måske har den showtimes?).');
        },
      });
  }

  // ---------- Showtimes ----------
  loadShowtimesByMovie(movieId: number): void {
    this.loadingShowtimes.set(true);

    this.showtimesService
      .getByMovie(movieId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          const list = (data ?? []).slice().sort((a, b) => {
            return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
          });
          this.showtimes.set(list);
          this.loadingShowtimes.set(false);
        },
        error: (err) => {
          console.error('getByMovie error', err);
          this.loadingShowtimes.set(false);
        },
      });
  }

  createShowtime(e?: Event): void {
    e?.preventDefault();

    this.error.set('');
    this.success.set('');

    const movieId = this.editingId();
    if (!movieId) {
      this.error.set('Klik Edit på en film før du kan oprette showtime.');
      return;
    }

    if (this.showtimeForm.invalid) {
      this.error.set('Showtime-form er ugyldig (dato, tid, sal, pris).');
      return;
    }

    const date = this.showtimeForm.value.date!;
    const time = this.showtimeForm.value.time!;
    const hallId = Number(this.showtimeForm.value.hallId);
    const price = Number(this.showtimeForm.value.price);

    const startTime = `${date}T${time}:00`;

    const dto: ShowTimesDTORequest = {
      showtimeId: 0,
      movieId,
      hallId,
      startTime,
      price,
    };

    this.loadingShowtimes.set(true);

    this.showtimesService
      .create(dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadingShowtimes.set(false);
          this.success.set('Showtime oprettet.');
          this.showtimeForm.reset({ date: '', time: '', hallId: null, price: 150 });
          this.loadShowtimesByMovie(movieId);
        },
        error: (err) => {
          console.error('create showtime error', err);
          const backendErrors = err?.error?.errors;
          this.error.set(backendErrors ? 'Validation: ' + JSON.stringify(backendErrors) : 'Kunne ikke oprette showtime.');
          this.loadingShowtimes.set(false);
        },
      });
  }

  deleteShowtime(st: ShowtimesDTOResponse): void {
    if (!confirm(`Slet showtime ${st.showtimeId}?`)) return;

    const movieId = this.editingId();
    if (!movieId) return;

    this.loadingShowtimes.set(true);

    this.showtimesService
      .delete(st.showtimeId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadingShowtimes.set(false);
          this.success.set('Showtime slettet.');
          this.loadShowtimesByMovie(movieId);
        },
        error: (err) => {
          console.error('delete showtime error', err);
          this.loadingShowtimes.set(false);
          this.error.set('Kunne ikke slette showtime.');
        },
      });
  }

  private toDateOnly(v: any): string {
    const d = new Date(v);
    if (isNaN(d.getTime())) return '';
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
