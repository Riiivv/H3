import { Component, OnInit } from '@angular/core';
import { HallsDTOResponse } from '../interfaces/halls.dto';
import { HallsService } from '../services/halls.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-halls',
  imports: [CommonModule],
  templateUrl: './all-halls.html',
  styleUrl: './all-halls.css',
})
export class AllHalls implements OnInit {
  halls: HallsDTOResponse[] = [];
  
  constructor(private hallsService: HallsService) {}

  ngOnInit(): void {
    this.hallsService.getAll().subscribe((data: HallsDTOResponse[]) => {
      this.halls = data;
    });

}
}