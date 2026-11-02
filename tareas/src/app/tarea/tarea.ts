import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css',
})
export class Tarea implements OnInit {
  tareas: TareaRegistro[] = [];

  // Variables del formulario
  titulo = '';
  descripcion = '';
  fechaLimite = '';
  estado = 'Pendiente'; // valor inicial propuesto al crear
  mensaje = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('sesionTareas')) {
      this.router.navigate(['/login']);
      return;
    }
    const datos = localStorage.getItem('agendaTareas');
    this.tareas = datos ? JSON.parse(datos) : [];
  }

  guardarEnStorage() {
    localStorage.setItem('agendaTareas', JSON.stringify(this.tareas));
  }

  validar(): boolean {
    if (!this.titulo.trim() || !this.descripcion.trim()) {
      this.mensaje = 'Título y descripción son obligatorios.';
      return false;
    }
    if (!this.fechaLimite) {
      this.mensaje = 'La fecha límite es obligatoria.';
      return false;
    }
    if (this.estado !== 'Pendiente' && this.estado !== 'Completada') {
      this.mensaje = 'El estado debe ser Pendiente o Completada.';
      return false;
    }
    this.mensaje = '';
    return true;
  }

  guardar() {
    if (!this.validar()) return;

    // ID automático: el mayor existente + 1 (o 1 si no hay registros)
    const nuevoId = this.tareas.length
      ? Math.max(...this.tareas.map((t) => t.id)) + 1
      : 1;

    this.tareas.push({
      id: nuevoId,
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      fechaLimite: this.fechaLimite,
      estado: this.estado,
    });

    this.guardarEnStorage();
    this.limpiar();
  }

  limpiar() {
    this.titulo = '';
    this.descripcion = '';
    this.fechaLimite = '';
    this.estado = 'Pendiente';
    this.mensaje = '';
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}