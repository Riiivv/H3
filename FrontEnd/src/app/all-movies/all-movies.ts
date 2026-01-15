import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesService } from '../services/movies.services';
import { MoviesDTOResponse } from '../interfaces/movies.dto';

type MovieVM = MoviesDTOResponse & {
  releaseYear: number;
  imageUrl: string;
};

@Component({
  selector: 'app-all-movies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-movies.html',
  styleUrl: './all-movies.css',
})
export class AllMovies implements OnInit {
  movies = signal<MovieVM[]>([]);
  loading = signal(false);
  error = signal('');

  @ViewChild('track', { static: false }) track?: ElementRef<HTMLDivElement>;

  private isPointerDown = false;
  private hasDragged = false;
  private dragStartX = 0;
  private dragStartScrollLeft = 0;

  private pointerId: number | null = null;
  private didCapture = false;

  private readonly DRAG_THRESHOLD = 6; // px

  constructor(
    private moviesService: MoviesService,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading.set(true);
    this.error.set('');

    this.moviesService
      .getAllMovies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: MoviesDTOResponse[]) => {
          const list = data ?? [];
          this.movies.set(
            list.map((m) => ({
              ...m,
              releaseYear: m.releaseDate ? new Date(m.releaseDate).getFullYear() : 0,
              imageUrl: `https://picsum.photos/300/450?random=${m.moviesId}`,
            }))
          );
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
          this.error.set('Kunne ikke hente film.');
        },
      });
  }

  scrollLeft(): void {
    const el = this.track?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: -(el.clientWidth * 0.9), behavior: 'smooth' });
  }

  scrollRight(): void {
    const el = this.track?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.9, behavior: 'smooth' });
  }

  // Pointer drag
  onPointerDown(e: PointerEvent): void {
    const el = this.track?.nativeElement;
    if (!el) return;

    this.isPointerDown = true;
    this.hasDragged = false;
    this.didCapture = false;
    this.pointerId = e.pointerId;

    this.dragStartX = e.clientX;
    this.dragStartScrollLeft = el.scrollLeft;
  }

  onPointerMove(e: PointerEvent): void {
    if (!this.isPointerDown) return;

    const el = this.track?.nativeElement;
    if (!el) return;

    const dx = e.clientX - this.dragStartX;

    // Først når drag er “rigtigt”, begynder vi at capture + preventDefault
    if (!this.hasDragged && Math.abs(dx) >= this.DRAG_THRESHOLD) {
      this.hasDragged = true;

      if (!this.didCapture && this.pointerId !== null) {
        el.setPointerCapture?.(this.pointerId);
        this.didCapture = true;
      }
    }

    if (this.hasDragged) {
      e.preventDefault();
      el.scrollLeft = this.dragStartScrollLeft - dx;
    }
  }

  onPointerUp(e: PointerEvent): void {
    const el = this.track?.nativeElement;
    if (!el) return;

    this.isPointerDown = false;

    if (this.didCapture && this.pointerId !== null) {
      el.releasePointerCapture?.(this.pointerId);
    }

    this.pointerId = null;
    this.didCapture = false;

    // Lad click-eventen læse hasDragged korrekt, og reset bagefter
    setTimeout(() => {
      this.hasDragged = false;
    }, 0);
  }

  onPointerLeave(): void {
    this.isPointerDown = false;
    this.hasDragged = false;
    this.pointerId = null;
    this.didCapture = false;
  }

  // Block navigation kun hvis det faktisk var et drag
  maybeBlockClick(e: MouseEvent): void {
    if (this.hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
