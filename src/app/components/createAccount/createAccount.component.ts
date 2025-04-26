import {Component, inject} from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { Firestore, addDoc, collection} from '@angular/fire/firestore';
import { UserModel} from '../../models/user.model';

@Component({
  selector: 'app-createAccount',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './createAccount.component.html',
  styleUrl: './createAccount.component.css'
})
export class CreateAccountComponent {
  private db: Firestore = inject(Firestore);
  private dbRef = collection(this.db, 'user')

  async addUser() {
    const user: UserModel = {
      birthday: "01/01/01",
      email:"hola@.qq.com",
      password:"12345",
      profilePhoto:"1.png",
      userName: "hola"
    }
  }
}
