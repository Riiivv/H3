import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Ticket } from './ticket/ticket';
import { AllMovies } from './all-movies/all-movies';
import { Contact } from './contact/contact';
import { AllPeople } from './all-people/all-people';
import { FilmDetails } from './film-details/film-details';
import { FilmAdministration } from './film-administration/film-administration';
import { AllTickets } from './all-tickets/all-tickets';

export const routes: Routes = [
  { path: '', component: Home, title: 'Forside' },
  { path: 'home', component: Home, title: 'Forside' },
  { path: 'film/:id', component: FilmDetails, title: 'Film' },

  { path: 'all-movies', component: AllMovies, title: 'All Movies' },
  { path: 'tickets', component: AllTickets, title: 'Tickets' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: 'about', component: About, title: 'About' },
  { path: 'people', component: AllPeople, title: 'People' },
  { path: 'tickets/:showtimeId', component: AllTickets },

  // ADMIN
  { path: 'admin', component: FilmAdministration, title: 'Admin' },

  { path: '**', redirectTo: '' },
];
