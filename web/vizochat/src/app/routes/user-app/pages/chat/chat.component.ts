import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import * as appActions from '../../store/actions'
import { chatRoomsSelector } from '../../store/selectors';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  constructor(private store$:Store<appStateInterface>){}
  chatRooms$!:Observable<any>;
  ngOnInit(): void {
    this.store$.dispatch(
      appActions.getChatRooms({})
    )
    this.chatRooms$ = this.store$.pipe(select(chatRoomsSelector))
  }

  getDateRelative(date:string): string {
    return moment(date).fromNow();
  }
}
