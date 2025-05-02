import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {map} from 'rxjs';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthService);
    return authState.authState.pipe(
      map((state) => {
        console.log("stado" + state);
        if(!state) {
          router.navigateByUrl('login');
          return false;
        }
        return true;
      }),
    );
  }
}

export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthService);
    return authState.authState.pipe(
      map((state) => {
        if(state) {
          router.navigateByUrl('mainPage');
          return false;
        }
        return true;
      }),
    );
  }
}
