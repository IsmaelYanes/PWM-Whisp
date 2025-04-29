import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import { MessageAudioComponent } from '../message-audio/message-audio.component';
import {FirestoreService} from '../../services/firestore.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user.interface';
import { switchMap } from 'rxjs';
import { of } from 'rxjs';

@Component({
    selector: 'app-chat-panel',
    imports: [
        NgForOf,
        MessageAudioComponent
    ],
    templateUrl: './chat-panel.component.html',
    standalone: true,
    styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent {
  conversations = [1, 2, 3, 4, 5];
  user!: User;

  constructor(private authService: AuthService,
              private firestoreService: FirestoreService) {
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe(user => {
      if (user) {
        this.firestoreService.getUserById(user.uid).subscribe(userData => {
          console.log(userData);
          this.user = userData;
        });
      }
    });
  }
}

/* this.authService.getAuthState().subscribe(user => {
      if (user) {
        this.firestoreService.getUserById(user.uid).subscribe(userData => {
          console.log(userData);
          this.user = userData;
        });
      }
    });
 * subscribe() -> funcion para escuchar los valores emitidos por un observable.
 * Un observable es como una radio q emite info, y yo me subscribo para recibirla
 *
 * Esto this.authService.getAuthState() me devuelve un observable del user autenticado
 * y cada vez q cambia el estado de sesión (login, logout), se ejecuta lo que hay
 * dentro del subscribe()
 *
 * Si el usuario está autenticado, (if (user)), usamos user.uid para acceder a su
 * documento en firestore con this.firestoreService.getUserById(user.uid).
 * Esto devuelve un observable por si los datos son actualizados en algun momento
 *
 * El segundo subscribe() obtiene los datos completos desde firestore y los guarda
 * en this.user.
 *
 * En este caso se devuelve 2 subscribe pq el primero escucha los cambios de
 * autenticacion (login/logout), y el segundo, escucha los cambios en el documento
 * del usuario en firestore
* */
