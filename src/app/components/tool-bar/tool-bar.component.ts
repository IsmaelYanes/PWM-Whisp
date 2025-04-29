import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  imports: [],
  templateUrl: './tool-bar.component.html',
  standalone: true,
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
  @Output() toolBarEvent = new EventEmitter<number>();

  switchWindow(index: number) {
    this.toolBarEvent.emit(index);
  }
}
