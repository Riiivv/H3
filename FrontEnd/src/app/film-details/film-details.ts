import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../services/services';
import { Film } from '../interfaces/film';

interface DaySchedule {
  date: Date;
  times: string[];
}

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-details.html',
  styleUrl: './film-details.css'
})
export class FilmDetails implements OnInit {

  film?: Film;

  days: DaySchedule[] = [];
  activeDayIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmService: Services          // <-- HER bruger vi din service
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.film = this.filmService.getFilmById(id || 0) ?? undefined;

    this.buildDummySchedule();
  }

  // laver 7 dage frem med dummy tider
  private buildDummySchedule() {
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const times =
        i % 2 === 0 ? ['14:00', '16:00', '18:30'] : ['13:00', '15:30', '19:00'];

      this.days.push({ date: d, times });
    }
  }

  selectDay(index: number) {
    this.activeDayIndex = index;
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
