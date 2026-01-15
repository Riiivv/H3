import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { environment } from '../../environments/environment';

type SeatType = 'Standard' | 'Wheelchair' | 'Companion';
type SeatStatus = 'Available' | 'SelectedByYou';

interface SeatApi {
  seatId: number;
  rowNumber: number;
  seatNumber: number;
  hallId: number;
  seatType: number; // 0/1/2 fra backend
}

interface SeatUI {
  seatId: number;
  rowNumber: number;
  seatNumber: number;
  hallId: number;
  seatType: SeatType;
  status: SeatStatus;
}

@Component({
  selector: 'app-all-tickets',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './all-tickets.html',
  styleUrl: './all-tickets.css',
})
export class AllTickets implements OnInit {
  private readonly baseUrl = environment.apiBaseUrl;

  hallId = signal<number>(0);

  showLegend = signal(true);
  showTicketCountModal = signal(true);
  ticketCount = signal<number>(2);

  seats = signal<SeatUI[]>([]);
  selectedSeatIds = signal<number[]>([]);

  secondsLeft = signal<number>(0);
  loading = signal(false);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Robust param read: prøver showtimeId, hallId, id
    const raw =
      this.route.snapshot.paramMap.get('showtimeId') ??
      this.route.snapshot.paramMap.get('hallId') ??
      this.route.snapshot.paramMap.get('id');

    const id = Number(raw);
    this.hallId.set(Number.isFinite(id) ? id : 0);

    if (!this.hallId() || this.hallId() <= 0) {
      this.error.set('Manglende hallId i URL.');
      this.showTicketCountModal.set(false);
      return;
    }

    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.tickHold());
  }

  private seatsUrl() {
    return `${this.baseUrl}/api/seats`;
  }

  private toSeatType(v: any): SeatType {
    if (v === 1 || v === 'Wheelchair') return 'Wheelchair';
    if (v === 2 || v === 'Companion') return 'Companion';
    return 'Standard';
  }

  pickTicketCount(n: number): void {
    this.ticketCount.set(n);
    this.showTicketCountModal.set(false);

    this.selectedSeatIds.set([]);
    this.secondsLeft.set(0);

    this.loadSeats(() => this.autoPickRandomSeats());
  }

  toggleLegend(): void {
    this.showLegend.set(!this.showLegend());
  }

  private loadSeats(after?: () => void): void {
    this.loading.set(true);
    this.error.set('');

    this.http
      .get<SeatApi[]>(this.seatsUrl())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          const all: SeatUI[] = (data ?? []).map((s) => ({
            seatId: s.seatId,
            rowNumber: s.rowNumber,
            seatNumber: s.seatNumber,
            hallId: s.hallId,
            seatType: this.toSeatType(s.seatType),
            status: 'Available',
          }));

          const filtered = all.filter((s) => s.hallId === this.hallId());

          if (filtered.length === 0) {
            this.error.set(`Ingen seats fundet for hallId=${this.hallId()}.`);
          }

          filtered.sort((a, b) => (a.rowNumber - b.rowNumber) || (a.seatNumber - b.seatNumber));
          this.seats.set(filtered);
          this.refreshStatus();
          this.loading.set(false);
          after?.();
        },
        error: () => {
          this.error.set('Kunne ikke hente seats.');
          this.loading.set(false);
        },
      });
  }

  private autoPickRandomSeats(): void {
    const list = this.seats().filter((s) => s.status === 'Available');
    const wanted = this.ticketCount();

    // Undgå wheelchair/companion hvis muligt
    const preferred = list.filter((s) => s.seatType === 'Standard');
    const source = preferred.length >= wanted ? preferred : list;

    const shuffled = [...source].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, wanted).map((s) => s.seatId);

    this.selectedSeatIds.set(picked);
    this.secondsLeft.set(picked.length > 0 ? 120 : 0);
    this.refreshStatus();
  }

  onSeatClick(seat: SeatUI): void {
    const current = this.selectedSeatIds();
    const isSelected = current.includes(seat.seatId);

    let next: number[];
    if (isSelected) {
      next = current.filter((id) => id !== seat.seatId);
    } else {
      if (current.length >= this.ticketCount()) return;
      next = [...current, seat.seatId];
    }

    this.selectedSeatIds.set(next);
    this.secondsLeft.set(next.length > 0 ? 120 : 0);
    this.refreshStatus();
  }

  releaseHolds(): void {
    this.selectedSeatIds.set([]);
    this.secondsLeft.set(0);
    this.refreshStatus();
  }

  private tickHold(): void {
    const sec = this.secondsLeft();
    if (sec <= 0) return;

    const next = sec - 1;
    this.secondsLeft.set(next);

    if (next === 0) {
      this.selectedSeatIds.set([]);
      this.refreshStatus();
    }
  }

  private refreshStatus(): void {
    const selected = new Set(this.selectedSeatIds());
    this.seats.set(
      this.seats().map((s) => ({
        ...s,
        status: selected.has(s.seatId) ? 'SelectedByYou' : 'Available',
      }))
    );
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

  seatClass(seat: SeatUI): string {
    if (seat.status === 'SelectedByYou') return 'seat seat-selected';
    if (seat.seatType === 'Wheelchair') return 'seat seat-wheelchair';
    if (seat.seatType === 'Companion') return 'seat seat-companion';
    return 'seat seat-available';
  }
}
