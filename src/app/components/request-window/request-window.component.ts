import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from '../../models/user.interface';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-request-window',
  imports: [],
  templateUrl: './request-window.component.html',
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

  addToContact(user: User) {
    if (user.id !== undefined) {
      this.userService.addNewContact(user.id);
    }
  }
}
