import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChannelService } from '../channel.service';
import * as UserAppActions from '../../../../../../store/actions'
import { select, Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/models/appState.interface';
import { isLoadingSelector } from 'src/app/routes/user-app/store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  host:{
    'style': 'width:100%;'
  }
})
export class OverviewComponent implements AfterViewInit{

  formData = {
    channelName:null,
    channelDomain:null,
    channel_id:null
  };
  isLoading$!:Observable<boolean>;
  constructor(private channel:ChannelService, private store$:Store<appStateInterface>){
    this.isLoading$ = this.store$.pipe(select(isLoadingSelector))
  }
  ngAfterViewInit(): void {
    this.channel.getChannel().subscribe((data)=>{
      this.formData.channelName = data.name;
      this.formData.channelDomain = data.domain;
      this.formData.channel_id = data._id;
      
    })
  }
  onSubmit(){
    this.store$.dispatch(
      UserAppActions.editChannel(this.formData)
    )
  }
}
