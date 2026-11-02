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
    if (this.usuario === 'usuario' && this.clave === 'tareas123') {
      localStorage.setItem('sesionTareas', 'activa');
      this.router.navigate(['/tareas']);
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}