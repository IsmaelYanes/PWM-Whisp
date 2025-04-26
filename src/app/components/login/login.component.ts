// header.component.ts
import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { FormsModule} from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  login() {
    console.log(this.email);
    this.authService.login(this.email, this.password)
      .then(() => alert('Sesión iniciada'))
      .catch(err => alert(err.message));
  }
}
