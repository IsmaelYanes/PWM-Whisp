import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-message-audio',
    imports: [],
    templateUrl: './message-audio.component.html',
    standalone: true,
    styleUrl: './message-audio.component.css'
})
export class MessageAudioComponent {
  @Input() userPhoto: string|undefined;
}
