import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MessageAudioComponent} from '../message-audio/message-audio.component';
import {User} from '../../models/user.interface';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-voice-mail-request',
  imports: [
    MessageAudioComponent,
    NgIf,
  ],
  templateUrl: './voice-mail-request.component.html',
  styleUrl: './voice-mail-request.component.css'
})
export class VoiceMailRequestComponent{
  @Input() requestUser!: User;

  constructor(
    private userService: UserService,
    private authService: AuthService) {
  }

  reject() {
    const currentUserId = this.authService.getCurrentUser();
    console.log(currentUserId);
    console.log(this.requestUser.id);
    if (this.requestUser.id !== undefined && currentUserId !== undefined) {
      this.userService.rejectInvitation(currentUserId, this.requestUser.id);
    }else {
      console.log('error de rechazo');
    }
  }

  accept() {
    const currentUserId = this.authService.getCurrentUser();
    if (this.requestUser.id !== undefined && currentUserId !== undefined) {
      this.userService.addNewContact(currentUserId, this.requestUser.id);
    }else {
      console.log('error de aceptar');
    }
  }
}
