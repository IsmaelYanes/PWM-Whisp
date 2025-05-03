import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {MessageAudioComponent} from '../message-audio/message-audio.component';

@Component({
    selector: 'app-chat-window',
  imports: [
    NgIf,
    MessageAudioComponent
  ],
    templateUrl: './chat-window.component.html',
    standalone: true,
    styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {
  @Input() chatUserProfile!: string;
  @Input() currentUserProfile!: string;
}
