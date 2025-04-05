// header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar directivas estándar como ngIf, ngFor
import { RouterModule } from '@angular/router';
import { FooterComponent} from '../../components/footer/footer.component';
import {HeaderComponent} from '../../components/header/header.component';
import {PhotoCarouselComponent} from '../../components/photoCarousel/photoCarousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    PhotoCarouselComponent
    ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
