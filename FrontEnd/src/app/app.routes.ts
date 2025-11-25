import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Ticket } from './ticket/ticket';
import { AllMovies } from './all-movies/all-movies';
import { Contact } from './contact/contact';
import { FilmAdministation } from './film-administration/film-administration';

export const routes: Routes = [
    { path: '', component: Home, title: 'Forside' },
    { path: 'home', component: Home, title: 'Forside' },
    { path: 'tickets', component: Ticket, title: 'Tickets' },
    { path: 'contact', component: Contact, title: 'Contact' },
    { path: 'about', component : About, title : 'About' },
    { path: 'all-movies', component: AllMovies, title: 'All Movies' },
    { path: 'admin', component: FilmAdministation, title: 'admin' }
];
