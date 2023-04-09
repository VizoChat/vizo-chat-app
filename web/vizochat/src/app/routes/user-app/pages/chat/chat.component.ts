import { Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import * as appActions from '../../store/actions'
import { chatRoomsSelector, userDataSelector } from '../../store/selectors';
import * as moment from 'moment';
import { chatRooms } from '../../models/chat.interface';
import { SocketService } from 'src/app/shared/services/socket.service';
import { user } from '../../models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  chatRooms$!:Observable<chatRooms[]>;
  chatRoomsAsync$!:chatRooms[];
  userData!: user | null;
  @HostListener('window:beforeunload') 
  onBeforeUnload() {
    this.router.navigateByUrl('/app/chat');
  }
  constructor(private store$:Store<appStateInterface>,private socket:SocketService, private router:Router ){
    this.store$.pipe(select(userDataSelector)).subscribe((user)=>{
      if(user){
        this.socket.connect({dashboard:user?.dashboard},'/liveMsgNotification',{token: localStorage.getItem('actoken')??'noAcToken'})
        this.socket.on('notification:new-message',(data:any)=>{
          this.updateRooms(data)
          console.log('notification:new-message',data);
        })
      }
    })
  }
  ngOnInit(): void {
    this.store$.dispatch(
      appActions.getChatRooms({})
    )
    this.chatRooms$ = this.store$.pipe(select(chatRoomsSelector),tap((data)=>this.chatRoomsAsync$ = data))
   
  }

  getDateRelative(date:string): string {
    return moment(date).fromNow();
  }
  updateRooms(newMssg:{
    "channelid": string,
    "room": string,
    "message": {
        "message": string,
        "message_type": string,
        "time": string
    }
  }){
    // let subscri = this.chatRooms$.subscribe((chat_rooms)=>{
      let newData:chatRooms[] = JSON.parse(JSON.stringify(this.chatRoomsAsync$))
      console.log('chat_rooms',this.chatRoomsAsync$);
      
      newData.forEach((val:chatRooms,i:number)=>{
        if(val._id == newMssg.room){
          newData[i].message_preview= {
            message : newMssg.message.message, 
            time : newMssg.message.time,
            topic:val.message_preview.topic,
            newMessageCount:Number(val.message_preview.newMessageCount)+1
          }
        }
      })
      newData.sort((a, b) => {return Number(new Date(b.message_preview.time))-Number(new Date(a.message_preview.time)) });
      this.store$.dispatch(
        appActions.gotChatRooms({rooms:newData})
      )
    //   subscri.unsubscribe()
    // })
    
    /*
    {
      "channelid": "64244bf5db0717980b87cd9a",
      "room": "642c02896b2efe2679ccafe2",
      "message": {
          "message": "sdf",
          "message_type": "text",
          "time": "2023-04-08T04:53:25.910Z"
      }
    }
  */
    
  }
}
