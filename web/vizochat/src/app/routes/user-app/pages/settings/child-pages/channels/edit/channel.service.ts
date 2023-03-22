import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { channels } from 'src/app/routes/user-app/models/channels.interface';
import { channelsSelector } from 'src/app/routes/user-app/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  channelID:any;
  channels$!:Observable<channels[] | undefined>;
  currentChannel=new BehaviorSubject<any>(null);
  
  constructor(private store$:Store<appStateInterface>,private route:Router){
    // this.channelID = this.router.snapshot.paramMap.get('channelID');
    this.channels$ = this.store$.pipe(select(channelsSelector))
    
  }
  setChannelId(id:any){
    this.channels$.subscribe((data)=>{
      let leng = data?.length;
      let tried_fail = 1
      data?.forEach((val,i)=>{
        if(val._id == id){
          this.setChannel(val)
        } else {
          if(tried_fail==leng){
            this.route.navigate(['/app/manage/channels'])//redirection at 404
          }
          tried_fail++;
        }
      })
      console.log();
      
    })
  }
  setChannel(data:any){
    this.currentChannel.next(data)
    
  }
  getChannel():Observable<any>{
    return this.currentChannel
  }
}
