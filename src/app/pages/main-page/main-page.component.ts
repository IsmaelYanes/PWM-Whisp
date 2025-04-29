import { Component } from '@angular/core';
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
export class MainPageComponent {
  public switchWindow = 0;
  constructor() {
  }


  windowSwitched($event: number) {
    this.switchWindow = $event;
  }
}
