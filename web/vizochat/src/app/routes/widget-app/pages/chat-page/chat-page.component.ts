import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { select, Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/models/appState.interface';
import { chatsSelector } from '../../store/selectors';
import { map, Observable, Subscription, tap } from 'rxjs';
import { chats } from '../../models/chats.interface';
import * as wActions from '../../store/actions'
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/shared/services/socket.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnDestroy{
  @ViewChild('chatScreen') chatScreen!: ElementRef;

  chats!:Observable<chats[]>
  chatRoom!:string | null
  apiKey!:string | null;
  message_input:string ='';
  ids_subscription!:Subscription;
  constructor(private _location: Location, private store:Store<appStateInterface>, private route:ActivatedRoute, private socket:SocketService){
    this.apiKey =  this.route.snapshot.paramMap.get('channelid');
    this.chatRoom =  this.route.snapshot.paramMap.get('chatId');
    this.ids_subscription=this.route.paramMap.pipe(
      map(paramMap => [paramMap.get('chatId'),paramMap.get('channelid')])
    ).subscribe(([room_id,channelId])=>{
      this.chatRoom = room_id
      this.apiKey = channelId
      this.socket.connect({room:room_id,channelId},'/liveChats')
      this.store.dispatch(
        wActions.getChats({data:{
          apiKey:this.apiKey?this.apiKey:'',
          chatId:room_id?room_id:''
        }})
      )
      this.socket.on('new-message',(data:chats|any)=>{
        this.store.dispatch(
          wActions.gotNewChat({
            chat:data
          })
        )
        this.scrollToBottom()
      })
    })
    
    this.chats = this.store.pipe(select(chatsSelector),tap(()=>this.scrollToBottom()))

  }

  backClicked() {
    this._location.back();
  }
  onInput(event: any) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
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
    }, 500);
  }
  ngOnDestroy(): void {
    this.socket.disconnect()
    this.ids_subscription.unsubscribe()
  }
}
