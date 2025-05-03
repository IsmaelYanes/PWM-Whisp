import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from '../../models/user.interface';
import {UserService} from '../../services/user.service';
import {VoiceMailRequestComponent} from '../voice-mail-request/voice-mail-request.component';
import {NgForOf, NgFor} from '@angular/common';

@Component({
    selector: 'app-request-window',
  imports: [
    VoiceMailRequestComponent,
    NgForOf,
    NgFor
  ],
    templateUrl: './request-window.component.html',
    standalone: true,
    styleUrl: './request-window.component.css'
})
export class RequestWindowComponent implements OnChanges{
  @Input() userRequest!: string[];
  requestList: User[] = [];

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.loadRequests();
  }

  private loadRequests() {
    this.requestList=[];
    for (let id of this.userRequest) {
      this.userService.getUserByID(id).subscribe((user: User) => {
        this.requestList.push(user);
      })
    }
  }
}
