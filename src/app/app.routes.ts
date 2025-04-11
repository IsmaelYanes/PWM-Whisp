import { Routes } from '@angular/router';
import { HomeComponent} from './pages/home/home.component';
import { LoginPageComponent} from './pages/loginPage/loginPage.component';
import { CreateAccountPageComponent} from './pages/createAccountPage/createAccountPage.component';
import {MainPageComponent} from './pages/main-page/main-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signUp', component: CreateAccountPageComponent },
  { path: 'mainPage', component: MainPageComponent }

];
