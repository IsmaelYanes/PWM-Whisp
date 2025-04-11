// header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar directivas estándar como ngIf, ngFor
import { RouterModule } from '@angular/router';
import { FooterComponent} from '../../components/footer/footer.component';
import { CreateAccountComponent} from '../../components/createAccount/createAccount.component';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-createAccountPage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CreateAccountComponent,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './createAccountPage.component.html',
  styleUrls: ['./createAccountPage.component.css'],
})
export class CreateAccountPageComponent {}
