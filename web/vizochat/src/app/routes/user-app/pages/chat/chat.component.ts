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
  constructor(private store$:Store<appStateInterface>,private socket:SocketService, private router:Router, ){
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
      
      newData.forEach((val:chatRooms,i:number)=>{
        if(val._id == newMssg.room){
          newData[i].message_preview= {
            message : newMssg.message.message, 
            time : newMssg.message.time,
            topic:val.message_preview.topic,
            newMessageCount:Number(val.message_preview.newMessageCount)+1
          }
          this.sentNotification(newMssg.message.message,['app','chat',val.channel?._id,val._id])
        }
      })
      newData.sort((a, b) => {return Number(new Date(b.message_preview.time))-Number(new Date(a.message_preview.time)) });
      this.store$.dispatch(
        appActions.gotChatRooms({rooms:newData})
      )

  }
  sentNotification(mssg:string,url:any[]){
    Notification.requestPermission().then(perm=>{
      if(perm === 'granted' ){
        // let roomParams:any =  res.roomId
        // let user:any = res.reciever
        
     const notification =   new Notification("New message",{
          body:mssg,
          icon:'/favicon.ico',
          // tag:'chat message',
          vibrate: [200, 100, 200]
        })
        notification.addEventListener('click',()=>{
          this.router.navigate(url)
          window.focus();
        }) 
      }}
      )
  }
  transformToHTML(data:string):string{
    return data.replace(/&#60;/g,'<').replace(/&#62;/g,'>')
  }
}
