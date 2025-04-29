import { Injectable } from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {User} from '../models/user.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  //Crear un usuario nuevo con el uid pasado por parámetro
  setNewUser(user: User, id: string) {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return setDoc(userDocRef, user);
  }

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, {idField: 'id'}) as Observable<User[]>;
  }

  //Obtener los datos del usuairo por su uid
  getUserById(UserId: string): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${UserId}`);
    return docData(userDocRef, {idField: 'id'}) as Observable<User>;
  }
}
