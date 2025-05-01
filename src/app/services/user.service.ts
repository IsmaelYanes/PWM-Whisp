import {Injectable} from '@angular/core';
import {
  arrayUnion,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import {User} from '../models/user.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) {}

  addNewUser(id: string, user: User) {
    const userRef = doc(this.firestore, `users/${id}`);
    return setDoc(userRef, user);
  }

  getUserByID(id: string): Observable<User> {
    const userRef = doc(this.firestore, `users/${id}`);
    return docData(userRef) as Observable<User>;
  }

  editUser(id: string, data: Partial<User>) {
    const userRef = doc(this.firestore, `users/${id}`);
    return updateDoc(userRef, data);
  }

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, {idField: 'id'}) as Observable<User[]>;
  }

  addNewContact(id: string) {
    const userRef = doc(this.firestore, `users/${id}`);
    return updateDoc(userRef, { contact: arrayUnion(id) });
  }
}
