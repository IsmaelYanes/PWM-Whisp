// HomeHeader.component.ts
import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeHeader',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homeHeader.component.html',
  styleUrls: ['./homeHeader.component.css'],
})
export class HomeHeaderComponent {
  constructor(private router: Router) { }
  register(){
    window.location.href = "../pages/createAccountPage.html"
  }
  login(){
    this.router.navigate(['login']);
  }
}
