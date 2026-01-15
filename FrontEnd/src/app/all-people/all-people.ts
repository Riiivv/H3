import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.services';
import { PersonDTOResponse } from '../interfaces/person.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-people',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-people.html',
})
export class AllPeople implements OnInit {
  people: PersonDTOResponse[] = [];

  constructor(private PersonService: PersonService) {}

ngOnInit(): void {
  this.PersonService.getAllPersons().subscribe((data: PersonDTOResponse[]) => {
    this.people = data;
  });
}
}