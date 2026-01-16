import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesService } from '../services/movies.services';
import { ShowtimesService } from '../services/showtimes.services';
import { MoviesDTOResponse } from '../interfaces/movies.dto';
import { ShowtimesDTOResponse } from '../interfaces/showtimes.dto';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './film-details.html',
  styleUrl: './film-details.css',
})
export class FilmDetails implements OnInit {
  movie = signal<MoviesDTOResponse | undefined>(undefined);

  showtimesAll = signal<ShowtimesDTOResponse[]>([]);
  showtimesWeek = signal<ShowtimesDTOResponse[]>([]);

  weekStart = signal<Date | null>(null);
  weekEnd = signal<Date | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    private showtimesService: ShowtimesService,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = Number(params.get('id'));
        if (!id) return;

        this.movie.set(undefined);
        this.showtimesAll.set([]);
        this.showtimesWeek.set([]);
        this.weekStart.set(null);
        this.weekEnd.set(null);

        this.moviesService
          .getMovieById(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((m) => this.movie.set(m));

        this.showtimesService
          .getByMovie(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((s) => {
            const all = (s ?? []).slice().sort((a, b) => {
              return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
            });

            this.showtimesAll.set(all);

            if (all.length > 0) {
              this.applyWeekFilter(new Date(all[0].startTime));
            } else {
              this.applyWeekFilter(new Date());
            }
          });
      });
  }

  // Klik showtime -> /tickets/:showtimeId
goToTickets(s: any): void {
  console.log('CLICK SHOWTIME:', s);

  const rawShowtime =
    s?.showtimeId ??
    s?.showTimeId ??
    s?.id ??
    s?.showtimeID ??
    s?.ShowtimeId ??
    s?.ShowTimeID;

  const showtimeId = Number(rawShowtime);

  console.log('FOUND SHOWTIME ID:', showtimeId);

  if (!Number.isFinite(showtimeId) || showtimeId <= 0) {
    alert('Kunne ikke finde showtimeId (tjek console).');
    return;
  }

  this.router.navigate(['/tickets', showtimeId]).then((ok) => {
    console.log('Navigation success:', ok);
  });
}
  private applyWeekFilter(anchorDate: Date): void {
    const start = this.getWeekStart(anchorDate);
    const end = this.getWeekEnd(anchorDate);

    this.weekStart.set(start);
    this.weekEnd.set(end);

    const filtered = this.showtimesAll().filter((st) => {
      const t = new Date(st.startTime).getTime();
      return t >= start.getTime() && t <= end.getTime();
    });

    this.showtimesWeek.set(filtered);
  }

  private getWeekStart(d: Date): Date {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);

    const day = date.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day;

    date.setDate(date.getDate() + diffToMonday);
    return date;
  }

  private getWeekEnd(d: Date): Date {
    const start = this.getWeekStart(d);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
