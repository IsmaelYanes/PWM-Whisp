import {Component, OnInit} from '@angular/core';
import {FooterComponent} from '../../components/footer/footer.component';
import {HeaderComponent} from '../../components/header/header.component';
import {ChatPanelComponent} from '../../components/chat-panel/chat-panel.component';
import {ToolBarComponent} from '../../components/tool-bar/tool-bar.component';
import {SendWindowComponent} from '../../components/send-window/send-window.component';
import {ChatWindowComponent} from '../../components/chat-window/chat-window.component';
import {EditWindowComponent} from '../../components/edit-window/edit-window.component';
import {RequestWindowComponent} from '../../components/request-window/request-window.component';
import {SettingWindowComponent} from '../../components/setting-window/setting-window.component';
import {NgIf} from '@angular/common';
import {User} from '../../models/user.interface';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    ChatPanelComponent,
    ToolBarComponent,
    SendWindowComponent,
    ChatWindowComponent,
    EditWindowComponent,
    RequestWindowComponent,
    SettingWindowComponent,
    NgIf
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  private userId :string | undefined;
  private userData!: User;
  public switchWindow: string = "sendWindow";
  protected userPhoto: string = "assets/images/userphoto.png";
  protected chatUser!: string;
  contacts : string[] = [];
  requests : string[] = [];


  constructor(
    private authService: AuthService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.userId = this.authService.getCurrentUser();
    if (this.userId !== undefined) {
      this.userService.getUserByID(this.userId).subscribe(user => {
        this.userData = user;
        this.init();
      })
    }
  }


  init(){
    this.loadProfilePhoto();
    this.loadContacts();
    this.loadRequests();

  }

  windowSwitched($event: string) {
    this.switchWindow = $event;
  }

  receiveChangePhoto($event: string) {
    this.userPhoto = $event;
    if (this.userId !== undefined) {
      this.userService.editUser(this.userId, {profilePhoto: this.userPhoto});
    }
  }

  loadProfilePhoto() {
    if (this.userData.profilePhoto !== undefined) {
      this.userPhoto = this.userData.profilePhoto;
    }
  }

  loadContacts(){
    if (this.userData.contact !== undefined) {
      this.contacts = this.userData.contact;
    }
  }

  loadRequests(){
      if (this.userData.request !== undefined) {
        this.requests = this.userData.request;
      }
  }

  switchWindowSelect($event: string) {
    this.switchWindow = $event;
  }

  loadChatUser($event: string) {
    this.chatUser = $event;
  }
}





