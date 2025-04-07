import { Routes } from '@angular/router';
import { HomeComponent} from './pages/home/home.component';
import { LoginPageComponent} from './pages/loginPage/loginPage.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent }
];
