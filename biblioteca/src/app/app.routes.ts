import { Routes } from '@angular/router';
import {Login} from './login/login';
import {Libro} from './libro/libro';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'libros', component: Libro },
];
