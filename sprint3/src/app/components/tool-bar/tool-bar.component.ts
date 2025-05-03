import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  imports: [],
  templateUrl: './tool-bar.component.html',
  standalone: true,
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
  @Output() toolBarEvent = new EventEmitter<string>();

  switchWindow(window: string) {
    this.toolBarEvent.emit(window);
  }
}
