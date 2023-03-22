import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/models/appState.interface';
import { ChannelService } from '../channel.service';
import { delChannels, getChannels } from 'src/app/routes/user-app/store/actions';
import { isLoadingSelector, successMssgSelector } from 'src/app/routes/user-app/store/selectors';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnDestroy{
 
  constructor(private channel:ChannelService, private store$:Store<appStateInterface>, private routes:Router){
    this.isLoading$ = this.store$.pipe(select(isLoadingSelector))
    this.successMsg$ = this.store$.pipe(select(successMssgSelector))

    this.successMsgSubscription = this.successMsg$.subscribe(successMsg => {
      if(successMsg){
        this.routes.navigate(['/app/manage/channels'])
        this.store$.dispatch(
          getChannels()
        )
      }
    });
    let timout = 20000;
    let timoutIntervel = setInterval(()=>{
      this.countDownSeconds = Math.floor((timout/1000) % 60);
      if(timout <= 0){
        this.enableDltBtn = true;
        clearInterval(timoutIntervel);
      }
      timout -= 1000;
    },1000)
  }
  successMsgSubscription!:Subscription;
  countDownSeconds :number = 20;
  enableDltBtn:boolean = false;
  isLoading$!:Observable<boolean>;
  successMsg$!:Observable<string|null>;
  currentChannel:any;
  ngAfterViewInit(): void {
    this.channel.getChannel().subscribe((data)=>{
      this.currentChannel = data;
    })
  }
  onDelete(){
    let c_id = this.currentChannel._id;
    this.store$.dispatch(
      delChannels({channel_id:c_id})
    )
  }

  ngOnDestroy(): void {
    this.successMsgSubscription.unsubscribe()
  }
}
