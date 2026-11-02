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
  estado = 'Pendiente';
  mensaje = '';

  // null = modo creación; número = ID de la tarea que se está editando
  editandoId: number | null = null;

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

    if (this.editandoId === null) {
      // CREAR: ID automático = mayor existente + 1
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
    } else {
      // ACTUALIZAR: mismo ID, misma cantidad de filas
      const i = this.tareas.findIndex((t) => t.id === this.editandoId);
      if (i !== -1) {
        this.tareas[i] = {
          id: this.editandoId,
          titulo: this.titulo.trim(),
          descripcion: this.descripcion.trim(),
          fechaLimite: this.fechaLimite,
          estado: this.estado,
        };
      }
    }

    this.guardarEnStorage();
    this.limpiar();
  }

  editar(tarea: TareaRegistro) {
    // Copia los valores al formulario; el registro guardado no se toca
    this.editandoId = tarea.id;
    this.titulo = tarea.titulo;
    this.descripcion = tarea.descripcion;
    this.fechaLimite = tarea.fechaLimite;
    this.estado = tarea.estado;
    this.mensaje = '';
  }

  cancelar() {
    this.limpiar();
  }

    eliminar(tarea: TareaRegistro) {
    // Cancelar la confirmación conserva el registro
    if (!confirm('¿Eliminar la tarea "' + tarea.titulo + '"?')) {
      return;
    }

    // Se queda con todas las tareas excepto la eliminada
    this.tareas = this.tareas.filter((t) => t.id !== tarea.id);
    this.guardarEnStorage();

    // Si se estaba editando justo esa tarea, se sale del modo edición
    if (this.editandoId === tarea.id) {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.descripcion = '';
    this.fechaLimite = '';
    this.estado = 'Pendiente';
    this.mensaje = '';
    this.editandoId = null;
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}