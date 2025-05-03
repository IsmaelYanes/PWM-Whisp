// header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent} from '../../components/footer/footer.component';
import {HeaderComponent} from '../../components/header/header.component';
import {LoginComponent} from '../../components/login/login.component';

@Component({
  selector: 'app-loginPage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    LoginComponent
    ],
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.css'],
})
export class LoginPageComponent {}
