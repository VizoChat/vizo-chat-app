import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import * as UserAppActions from '../../../store/actions';
import { select, Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/models/appState.interface';
import { chatRooms, chats } from '../../../models/chat.interface';
import { chatRoomsSelector, chatSelector, userDataSelector } from '../../../store/selectors';
import { map, Observable, tap } from 'rxjs';
import { user } from '../../../models/user.interface';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  host:{
    'style': 'flex:1;'
  }
})

export class ChatWindowComponent implements OnInit, OnDestroy{
  @ViewChild('chatScreen') chatScreen!: ElementRef;
  isEmojiPickerVisible = false;
  message_input:string = '';
  room_id?:string|null;
  channelId:string|null = '';
  userData?:Observable<user | null>;
  userDataSync?:user | null;
  chats?:Observable<chats[] | undefined>;
  pageInitated_count:number = 0;
  apiUrl = environment.baseApiUrl;
  chat_rooms!:chatRooms[];
  current_chat_rooms!:chatRooms|null;
  popupImageUrl:string|null = null;
  imagesLoading:any = {}
  constructor(private socket:SocketService, private route:ActivatedRoute, private store$:Store<appStateInterface>, private api:ApiService){
    this.channelId = this.route.snapshot.paramMap.get('channelId')  
  }
  ngOnInit(): void {
    this.store$.pipe(select(chatRoomsSelector)).subscribe((data)=>{
      this.chat_rooms = data
      this.setCurrentRoomData()
    })
    this.route.paramMap.pipe(
      map(paramMap => [paramMap.get('roomId'),paramMap.get('channelId')])
    ).subscribe(([room_id,channelId])=>{
      this.pageInitated_count++;
      this.room_id = room_id
      this.channelId = channelId
      if(this.pageInitated_count>1){
        this.socket.disconnect()
      }
      this.imagesLoading = {}
      this.socket.connect({room:room_id,channelId},'/liveChats',{token: localStorage.getItem('actoken')??'noAcToken'})
      this.store$.dispatch(
        UserAppActions.getChats({room_id:this.room_id})
      )
      this.socket.on('new-message',(data:chats|any)=>{
        this.passMessageToRoom(data.message.message)
        this.store$.dispatch(
          UserAppActions.gotNewChat({
            chat:data
          })
        )
        this.scrollToBottom()
      })
      this.setCurrentRoomData()
    })
    this.userData = this.store$.pipe(select(userDataSelector)).pipe(tap((user)=>this.userDataSync = user))
    this.chats = this.store$.pipe(select(chatSelector),tap(()=>this.scrollToBottom()))
    
    
  }
  setCurrentRoomData(){
    this.current_chat_rooms = null;
    this.current_chat_rooms = JSON.parse(JSON.stringify({...this.chat_rooms.filter((val)=>val._id == this.room_id)[0]}))
    if(this.current_chat_rooms==null)return;
      this.current_chat_rooms.w_user = {...this.current_chat_rooms.w_user , additional_data : JSON.parse(this.current_chat_rooms.w_user.additional_data)}
      this.current_chat_rooms.w_user.page_history.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()); // not working the sorting
      console.log(this.current_chat_rooms,'current_chat_rooms');
  }
  send_message(f: NgForm):any{
    if(this.message_input.trim().length<1)return this.message_input ='';
    if(f.invalid)return;
    
    this.socket.emit('message',this.message_input)
    
    this.message_input =''
    this.scrollToBottom()
  }
  scrollToBottom() {
    setTimeout(() => {
      this.chatScreen.nativeElement.scrollTop = this.chatScreen.nativeElement.scrollHeight;
    }, 200);
  }
  passMessageToRoom(msg:string){
      let newData:chatRooms[] = JSON.parse(JSON.stringify(this.chat_rooms))
      newData.forEach((val:chatRooms,i:number)=>{
        if(val._id == this.room_id){
          newData[i].message_preview= {
            message : msg, 
            time : new Date().toISOString(),
            topic:val.message_preview.topic,
            newMessageCount:0//val.message_preview.newMessageCount
          }
        }
      })
      newData.sort((a, b) => {return Number(new Date(b.message_preview.time))-Number(new Date(a.message_preview.time)) });
      this.store$.dispatch(
        UserAppActions.gotChatRooms({rooms:newData})
      )
    
  }
  addEmoji(event:any) {
    this.message_input += event.emoji.native;
    this.isEmojiPickerVisible = false;
 }
 fileUpload_Message(e:any){
  
  let thisform = new FormData();
  console.log(e.target.files[0]);
  
  thisform.append('message_image', e.target.files[0],e.target.files[0].name)
  
  this.api.sentImage(thisform).subscribe({next:(data)=>{
    console.log(data);
  },error:(er)=>{console.log(er);}
  })
 }
  ngOnDestroy(): void {
    this.socket.disconnect()
  }
}
