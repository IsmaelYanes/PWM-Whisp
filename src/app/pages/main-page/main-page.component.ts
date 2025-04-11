import { Component } from '@angular/core';
import {FooterComponent} from '../../components/footer/footer.component';
import {HeaderComponent} from '../../components/header/header.component';
import {ChatPanelComponent} from '../../components/chat-panel/chat-panel.component';
import {ToolBarComponent} from '../../components/tool-bar/tool-bar.component';
import {SendWindowComponent} from '../../components/send-window/send-window.component';

@Component({
  selector: 'app-main-page',
  imports: [
    FooterComponent,
    HeaderComponent,
    ChatPanelComponent,
    ToolBarComponent,
    SendWindowComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
