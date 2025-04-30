import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MessageAudioComponent} from '../message-audio/message-audio.component';
import {User} from '../../models/user.interface';

@Component({
  selector: 'app-voice-mail-request',
  imports: [
    MessageAudioComponent
  ],
  templateUrl: './voice-mail-request.component.html',
  styleUrl: './voice-mail-request.component.css'
})
export class VoiceMailRequestComponent implements OnChanges{
  @Input() currentUser!: User;

  ngOnChanges(changes: SimpleChanges) {
    console.log('CAMBIO en user:', changes['currentUser']);
  }
  reject() {

  }

  accept() {

  }
}
