
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario = '';
  clave = '';
  error = '';

  constructor(private router: Router) {}

  entrar() {
    if (this.usuario === 'bibliotecario' && this.clave === 'biblio123') {
      localStorage.setItem('sesionBiblioteca', 'activa');
      this.router.navigate(['/libros']);
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}