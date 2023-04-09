import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import * as widgetActions from '../../store/actions'
import { isLoadingSelector, roomsSelector } from '../../store/selectors';
import * as moment from 'moment';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.component.html',
  styleUrls: ['./init-page.component.css']
})
export class InitPageComponent implements OnInit{
 
  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    console.log('Received message:', event.data);
  }
  
  params:any = {}
  rooms:any = {}
  loader$!:Observable<Boolean>;
  apiKey:string|null;
  constructor(private store$:Store<appStateInterface>, private routes:ActivatedRoute){
    this.routes.snapshot.queryParamMap.keys.forEach((key:any) => {
      this.params[key] = this.routes.snapshot.queryParamMap.get(key);
    });
    this.loader$ = this.store$.pipe(select(isLoadingSelector))
    this.apiKey =  this.routes.snapshot.paramMap.get('channelid');
    this.rooms = this.store$.pipe(select(roomsSelector))
   
  }
  ngOnInit(): void {
    console.log('initiaed');
    
  }
  newChatRoom(){
    this.store$.dispatch(
      widgetActions.newChatRoom({data:this.params})
    )
  }
  getDateRelative(date:string): string {
    return moment(date).fromNow();
  }
}
