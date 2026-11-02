import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface LibroRegistro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;
}

@Component({
  selector: 'app-libro',
  imports: [],
  templateUrl: './libro.html',
  styleUrl: './libro.css',
})
export class Libro implements OnInit {
  libros: LibroRegistro[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Sin marca de sesión, regresa al login
    if (!localStorage.getItem('sesionBiblioteca')) {
      this.router.navigate(['/login']);
      return;
    }
    // Recupera el arreglo guardado como texto JSON
    const datos = localStorage.getItem('librosBiblioteca');
    this.libros = datos ? JSON.parse(datos) : [];
  }

  cerrarSesion() {
    // Borra solo la marca de sesión; los libros se conservan
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}
