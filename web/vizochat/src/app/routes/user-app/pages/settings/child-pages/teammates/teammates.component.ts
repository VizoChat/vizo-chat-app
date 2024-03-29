import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { teammates } from 'src/app/routes/user-app/models/teammates.interface';
import * as userAppActions from 'src/app/routes/user-app/store/actions'
import { TeammatesSelector } from 'src/app/routes/user-app/store/selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teammates',
  templateUrl: './teammates.component.html',
  styleUrls: ['./teammates.component.css'],
  host: {
    'style': 'flex:1;'
  }
})
export class TeammatesComponent implements OnInit{
  apiUrl = environment.baseApiUrl
  teammates?:Observable<teammates[] | undefined>
  constructor(private store$:Store<appStateInterface>){
    this.teammates = this.store$.pipe(select(TeammatesSelector))
  }
  ngOnInit(): void {
    this.store$.dispatch(
      userAppActions.getTeammates()
    )
  }
}
