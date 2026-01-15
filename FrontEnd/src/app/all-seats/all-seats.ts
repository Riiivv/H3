import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SeatsService } from '../services/seats.services';

type SeatType = 'Standard' | 'Wheelchair' | 'Companion';

interface SeatUI {
  seatId: number;
  rowNumber: number;
  seatNumber: number;
  hallId: number;
  seatType: SeatType;
}

@Component({
  selector: 'app-all-seats',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './all-seats.html',
  styleUrl: './all-seats.css',
})
export class AllSeats implements OnInit {
  hallId = signal<number | null>(null);
  seats = signal<SeatUI[]>([]);
  loading = signal(false);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private seatsService: SeatsService,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const hallId = Number(this.route.snapshot.paramMap.get('hallId'));
    this.hallId.set(Number.isFinite(hallId) && hallId > 0 ? hallId : null);

    this.loadSeats();
  }

  private toSeatType(v: any): SeatType {
    // backend kan sende int eller string
    if (v === 1 || v === 'Wheelchair') return 'Wheelchair';
    if (v === 2 || v === 'Companion') return 'Companion';
    return 'Standard';
  }

  loadSeats(): void {
    this.loading.set(true);
    this.error.set('');

    this.seatsService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        // VIGTIGT: ingen type annotation her -> matcher SeatsService
        next: (data) => {
          const raw = (data as any[]) ?? [];

          const normalized: SeatUI[] = raw
            .map(s => ({
              seatId: Number(s.seatId ?? s.SeatId),
              rowNumber: Number(s.rowNumber ?? s.rownumber ?? s.RowNumber),
              seatNumber: Number(s.seatNumber ?? s.seatnumber ?? s.SeatNumber),
              hallId: Number(s.hallId ?? s.HallId),
              seatType: this.toSeatType(s.seatType ?? s.SeatType),
            }))
            .filter(s =>
              Number.isFinite(s.seatId) &&
              Number.isFinite(s.rowNumber) &&
              Number.isFinite(s.seatNumber) &&
              Number.isFinite(s.hallId)
            );

          const hid = this.hallId();
          const filtered = hid ? normalized.filter(s => s.hallId === hid) : normalized;

          filtered.sort((a, b) => (a.rowNumber - b.rowNumber) || (a.seatNumber - b.seatNumber));

          this.seats.set(filtered);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.error.set('Kunne ikke hente seats.');
          this.loading.set(false);
        },
      });
  }

  rows(): { row: number; seats: SeatUI[] }[] {
    const map = new Map<number, SeatUI[]>();
    for (const s of this.seats()) {
      if (!map.has(s.rowNumber)) map.set(s.rowNumber, []);
      map.get(s.rowNumber)!.push(s);
    }

    return Array.from(map.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([row, seats]) => ({
        row,
        seats: seats.sort((a, b) => a.seatNumber - b.seatNumber),
      }));
  }

  seatClass(s: SeatUI): string {
    if (s.seatType === 'Wheelchair') return 'seat seat-wheelchair';
    if (s.seatType === 'Companion') return 'seat seat-companion';
    return 'seat seat-standard';
  }
}
