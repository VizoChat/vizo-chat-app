import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-window-default',
  templateUrl: './chat-window-default.component.html',
  styleUrls: ['./chat-window-default.component.css'],
  host:{
    'style': 'flex:1;'
  }
})
export class ChatWindowDefaultComponent {

}
