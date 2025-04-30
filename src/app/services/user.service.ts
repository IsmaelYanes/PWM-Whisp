import {inject, Injectable} from '@angular/core';
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  collectionData,
  docData,
  getDoc,
  arrayUnion,
  Firestore, setDoc, updateDoc
} from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore) {}

  async addNewUser(id:string, user:User) {
    try {
      const userRef = doc(this.firestore, `users/${id}`);
      await setDoc(userRef, user);
    }catch (error) {
      console.log("Error de agregar usuario", error);
    }
  }

  getUserByID(id:string):Observable<User> {
    const userRef = doc(this.firestore, `users/${id}`);
    return docData(userRef) as Observable<User>;
  }

  async editUser(id:string, data:Partial<User>) {
    try {
      const userRef = doc(this.firestore, `users/${id}`);
      await updateDoc(userRef, data);
    }catch (error) {
      console.log("Error de editar perfil", error);
    }
  }

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, {idField: 'id'}) as Observable<User[]>;
  }


  async addNewContact(id: string) {
    try {
      const userRef = doc(this.firestore, `users/${id}`);
      await updateDoc(userRef, { contact: arrayUnion(id)});
    }catch (error) {
      console.log("Error de añadir al contacto", error);
    }
  }
}
