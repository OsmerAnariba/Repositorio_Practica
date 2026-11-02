import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Tarea } from './tarea/tarea';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'tareas', component: Tarea },
];
