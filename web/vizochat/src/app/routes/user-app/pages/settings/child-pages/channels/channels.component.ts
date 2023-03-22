import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserAppActions from '../../../../store/actions'
import { channels } from 'src/app/routes/user-app/models/channels.interface';
import { appStateInterface } from 'src/app/models/appState.interface';
import { channelsSelector } from 'src/app/routes/user-app/store/selectors';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
  host: {
    'style': 'flex:1;'
  }
})
export class ChannelsComponent {
  channels$!:Observable<channels[] | undefined>
  constructor(private store$:Store<appStateInterface>){
    this.store$.dispatch(
      UserAppActions.getChannels()
    )
    this.channels$ = this.store$.pipe(select(channelsSelector))
  }
  
}
