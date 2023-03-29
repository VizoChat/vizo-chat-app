import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from './channel.service';
import * as channelActions from '../../../../../store/actions'
import { Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/models/appState.interface';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnDestroy{
  channelID:any;
  constructor(private route:ActivatedRoute, private channelService:ChannelService,  private store$:Store<appStateInterface>,){
    // this.channelID = this.route.snapshot.paramMap.get('channelID');
    this.route.params.subscribe((params:any) => {
      this.channelID = params.channelID;
      this.channelService.setChannelId(params.channelID)
    });
    
  }
  ngOnDestroy(): void {
    this.store$.dispatch(
      channelActions.getChannels()
    )
  }
  
}
