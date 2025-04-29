import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import { MessageAudioComponent } from '../message-audio/message-audio.component';

@Component({
  selector: 'app-chat-panel',
  imports: [
    NgForOf,
    MessageAudioComponent
  ],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent {
  userPhoto = "assets/images/userphoto.png";
  conversations = [1, 2, 3, 4, 5];
}
