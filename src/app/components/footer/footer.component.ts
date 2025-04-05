// header.component.ts
import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';  // Importa CommonModule para usar directivas estándar como ngIf, ngFor
import { RouterModule } from '@angular/router';  // Si necesitas enrutamiento dentro del header

@Component({
  selector: 'app-footer',
  standalone: true,  // Esto lo convierte en un componente standalone
  imports: [CommonModule, RouterModule],  // Importa CommonModule si usas directivas Angular
  templateUrl: './footer.component.html',  // Archivo de plantilla
  styleUrls: ['./footer.component.css'],  // Archivo de estilo
})
export class FooterComponent {}
