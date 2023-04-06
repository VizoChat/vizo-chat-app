import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import * as UserAppActions from '../../../store/actions';
import { select, Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/models/appState.interface';
import { chats } from '../../../models/chat.interface';
import { chatSelector, userDataSelector } from '../../../store/selectors';
import { map, Observable, tap } from 'rxjs';
import { user } from '../../../models/user.interface';

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
  message_input:string = '';
  room_id?:string|null;
  channelId:string|null = '';
  userData?:Observable<user | null>;
  userDataSync?:user | null;
  chats?:Observable<chats[] | undefined>;
  pageInitated_count:number = 0;
  constructor(private socket:SocketService, private route:ActivatedRoute, private store:Store<appStateInterface>){
    this.channelId = this.route.snapshot.paramMap.get('channelId')  
  }
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(paramMap => [paramMap.get('roomId'),paramMap.get('channelId')])
    ).subscribe(([room_id,channelId])=>{
      this.pageInitated_count++;
      this.room_id = room_id
      this.channelId = channelId
      if(this.pageInitated_count>1){
        this.socket.disconnect()
      }
      this.socket.connect({room:room_id,channelId},'/liveChats',{token: localStorage.getItem('actoken')??'noAcToken'})
      this.store.dispatch(
        UserAppActions.getChats({room_id:this.room_id})
      )
      this.socket.on('new-message',(data:chats|any)=>{
        console.log('new message: ',data);//////////////
        this.store.dispatch(
          UserAppActions.gotNewChat({
            chat:data
          })
        )
        this.scrollToBottom()
      })
    })

    this.userData = this.store.pipe(select(userDataSelector)).pipe(tap((user)=>this.userDataSync = user))
     this.chats = this.store.pipe(select(chatSelector),tap(()=>this.scrollToBottom()))
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
  ngOnDestroy(): void {
    this.socket.disconnect()
  }
}
