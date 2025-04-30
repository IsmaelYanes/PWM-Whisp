import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-edit-window',
  imports: [
    NgForOf
  ],
  templateUrl: './edit-window.component.html',
  styleUrl: './edit-window.component.css'
})
export class EditWindowComponent {
  @Output() photoChanged = new EventEmitter();
  defaultPhoto:string = "assets/images/users.png";
  rows:number[] = [0,1,2,3,4];
  columns:number[] = this.rows;

  changeProfilePhoto(row:number) {
    this.defaultPhoto = 'assets/images/icons/' + row + '.jpg';
  }

  onClickToChangeProfilePhoto() {
    this.photoChanged.emit(this.defaultPhoto);
  }
}
