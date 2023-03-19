import { Component } from '@angular/core';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
  host: {
    'style': 'flex:1;'
  }
})
export class ChannelsComponent {
  newChannelMdal = false;
  shownewChannelMdal(){
    this.newChannelMdal = true
  }
  closenewChannelMdal(){
    this.newChannelMdal = false
  }
}
