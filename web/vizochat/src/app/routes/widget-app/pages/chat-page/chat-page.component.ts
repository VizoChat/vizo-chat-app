import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {

  constructor(private _location: Location){}

  backClicked() {
    this._location.back();
  }
  onInput(event: any) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }
}
