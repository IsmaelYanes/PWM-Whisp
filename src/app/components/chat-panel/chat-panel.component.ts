import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-chat-panel',
  imports: [
    NgForOf
  ],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent {
  userPhoto = "assets/images/userphoto.png";
  conversations = [];
}
