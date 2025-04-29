import {inject, Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import {User} from '../models/user.interface';
import {FirestoreService} from './firestore.service';
import { authState } from '@angular/fire/auth';
import { User as FirebaseUser } from 'firebase/auth';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestoreService = inject(FirestoreService);

  signUp(userData: User) {
    return createUserWithEmailAndPassword(this.auth, userData.email, userData.password!).then(userCredential => {
      const user = userCredential.user;

      //se crea un nuevo usuario con los datos pasados por parametro que vienen del formulario
      //de createAccount
      const newUser: User = {
        id: user.uid,
        email: userData.email,
        name: userData.name,
        birthday: userData.birthday,
        imageProfile: userData.imageProfile,
        contact: userData.contact,
        request: userData.request,
        chat: userData.chat,
      };

      //con el servicio de firestore almacenamos el user
      return this.firestoreService.setNewUser(newUser, user.uid);
    });
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password!);
  }

  getAuthState(): Observable<FirebaseUser | null> {
    return authState(this.auth);
  }

}
