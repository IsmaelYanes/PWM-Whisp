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
export class PhotoCarouselComponent {
  currentSlide = 0;

  images = [
    {
      src: 'https://media.istockphoto.com/id/1332486323/photo/big-secret-young-arab-man-sharing-news-with-his-excited-girlfriend.jpg?s=612x612&w=0&k=20&c=akWDGr3R82lMglE7dCkIMbwVH9BQzu9wTxC5mZ0yB8k=',
      alt: 'Imagen 1'
    },
    {
      src: 'https://www.shutterstock.com/image-photo/young-couple-two-friends-family-600nw-2296745393.jpg',
      alt: 'Imagen 2'
    },
    {
      src: 'https://www.shutterstock.com/image-photo/portrait-optimistic-girl-wavy-hairstyle-600nw-2461362537.jpg',
      alt: 'Imagen 3'
    }
  ];

  showSlide(index: number): void {
    this.currentSlide = index;
  }
}
