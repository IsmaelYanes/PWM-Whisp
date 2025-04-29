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
  user!: User | null;

  constructor(private authService: AuthService,
              private firestoreService: FirestoreService) {
  }

  ngOnInit() {
    // el switchMap -> Cuando llegue el usuario logueado,
    // conéctate automáticamente a su documento en Firestore.
    // Si no hay usuario, no hagas nada.
    // .pipe -> encadenar operadores q permiten transformar filtar o
    // realizar otras acciones sobre los valores emitidos por el observable
    this.authService.getAuthState().pipe(
      switchMap(user => {
        if (user) {
          return this.firestoreService.getUserById(user.uid); // <- devuelve Observable<User>
        } else {
          return of(null); // <- devuelve Observable<null> si no hay usuario
        }
      })
      //una vez conectado con el usuario usamos los datos
    ).subscribe(userData => {
      this.user = userData;
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
