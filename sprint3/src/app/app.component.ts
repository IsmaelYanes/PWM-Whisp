import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Necesario para cargar las rutas
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,  // Esto indica que el componente es independiente
  imports: [
    RouterOutlet, // Componente necesario para cargar las rutas
    NgxSonnerToaster
  ],
  templateUrl: './app.component.html',  // El template donde se renderiza el router-outlet
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular';
}
