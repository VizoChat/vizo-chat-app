import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, mergeMap, Observable, Subscription } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { teammates } from 'src/app/routes/user-app/models/teammates.interface';
import  * as userAppActions  from 'src/app/routes/user-app/store/actions' 
import { TeammatesSelector } from 'src/app/routes/user-app/store/selectors';
import { environment } from 'src/environments/environment';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{
  members!:Subscription;
  membersData!:{channelAgents:teammates[],otherTeammates:teammates[]};
  channel!:any;
  btns:any= {_v:''}
  apiUrl = environment.baseApiUrl;
  constructor(private store$:Store<appStateInterface>, private channelService:ChannelService){
    this.members = this.store$.pipe(
      select(TeammatesSelector),
      mergeMap((membersData)=>{
        return this.channelService.getChannel().pipe(
          map(channelData => [membersData, channelData])
        );  
      })
    )
    .subscribe(([membersData, channelData])=>{
      this.channel = channelData
      this.membersData = this.makeTeammateGroup(membersData, channelData);
    })
    
  }
  ngOnInit(): void {
    this.store$.dispatch(
      userAppActions.getTeammates()
    )
  }
  private makeTeammateGroup(membersData:teammates[], channelData:any):{channelAgents:teammates[], otherTeammates:teammates[]}{
    this.resetBtnLoaders();
    if(membersData&& channelData){
      let channelAgents:teammates[]|undefined = [];
      let otherTeammates:teammates[] = [...membersData];

      for (const i in membersData) {
        for (const i2 in channelData.agents) {
          
          if(membersData[i]._id == channelData.agents[i2]._id){
            channelAgents.push(membersData[i])
            // delete otherTeammates[i]
            otherTeammates = otherTeammates.filter((v,i3)=> otherTeammates[i3]._id!=channelData.agents[i2]._id)
          }
        }
      }
      return {channelAgents,otherTeammates}
    }
    return {channelAgents:[],otherTeammates:[]}
  }
  submitChanges(teammate_id:string,mode:"Push" | "Pull"){
    this.btns[teammate_id] = true
    this.store$.dispatch(
      userAppActions.editChannelMembers({data:{channel_id:this.channel._id,teammate_id},mode})
    )
  }
  resetBtnLoaders(){
    this.btns = {_v:1}
  }
}
