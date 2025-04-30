import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgForOf} from '@angular/common';
import { MessageAudioComponent } from '../message-audio/message-audio.component';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.interface';

@Component({
  selector: 'app-chat-panel',
  imports: [
    NgForOf,
    MessageAudioComponent
  ],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent implements OnChanges{

  @Input() userPhoto: string = "assets/images/userphoto.png";
  @Input() userContacts:string[] = [];
  protected conversations: User[] = [];

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userContacts'] && this.userContacts.length > 0) {
      this.loadConversations();
    }
  }

  private loadConversations() {
    this.conversations=[];
    for (let id of this.userContacts) {
      this.userService.getUserByID(id).subscribe(user => {
        this.conversations.push(user);
      })
    }
  }
}
