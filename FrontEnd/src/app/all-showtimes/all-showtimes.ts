import { Component, OnInit } from '@angular/core';
import { ShowtimesService } from '../services/showtimes.services';
import { ShowtimesDTOResponse } from '../interfaces/showtimes.dto';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-showtimes',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './all-showtimes.html',
  styleUrl: './all-showtimes.css',
})
export class AllShowtimes implements OnInit {
  showtimes: ShowtimesDTOResponse[] = [];

  constructor(private showtimesService: ShowtimesService) {}

  ngOnInit(): void {
    this.showtimesService.getAll().subscribe((data: ShowtimesDTOResponse[]) => {
      this.showtimes = data;
    });
  }

}
