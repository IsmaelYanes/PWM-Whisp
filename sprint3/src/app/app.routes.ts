import { Routes } from '@angular/router';
import { HomeComponent} from './pages/home/home.component';
import { LoginPageComponent} from './pages/loginPage/loginPage.component';
import { CreateAccountPageComponent} from './pages/createAccountPage/createAccountPage.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {privateGuard, publicGuard} from './guards/auth.guard';

export const routes: Routes = [
  { canActivate: [publicGuard()], path: '', component: HomeComponent },
  { canActivate: [publicGuard()], path: 'login', component: LoginPageComponent },
  { canActivate: [publicGuard()], path: 'signUp', component: CreateAccountPageComponent },
  { canActivate: [privateGuard()], path: 'mainPage', component: MainPageComponent }
];
