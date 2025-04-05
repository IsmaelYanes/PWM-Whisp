// header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar directivas estándar como ngIf, ngFor
import { RouterModule } from '@angular/router';  // Si necesitas enrutamiento dentro del header

@Component({
  selector: 'app-photo-carousel',
  standalone: true,  // Esto lo convierte en un componente standalone
  imports: [CommonModule, RouterModule],  // Importa CommonModule si usas directivas Angular
  templateUrl: './photoCarousel.component.html',  // Archivo de plantilla
  styleUrls: ['./photoCarousel.component.css'],  // Archivo de estilo
})
export class PhotoCarouselComponent {}
