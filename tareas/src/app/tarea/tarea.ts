import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface TareaRegistro {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado: string;
}

@Component({
  selector: 'app-tarea',
  imports: [],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css',
})
export class Tarea implements OnInit {
  tareas: TareaRegistro[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Sin marca de sesión, regresa al login
    if (!localStorage.getItem('sesionTareas')) {
      this.router.navigate(['/login']);
      return;
    }
    // Recupera el arreglo guardado como texto JSON
    const datos = localStorage.getItem('agendaTareas');
    this.tareas = datos ? JSON.parse(datos) : [];
  }

  cerrarSesion() {
    // Borra solo la marca de sesión; las tareas se conservan
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}
