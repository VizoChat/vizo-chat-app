import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { teammates } from 'src/app/routes/user-app/models/teammates.interface';
import  * as userAppActions  from 'src/app/routes/user-app/store/actions' 
import { TeammatesSelector } from 'src/app/routes/user-app/store/selectors';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit{
  members!:Observable<teammates[] | undefined>;
  constructor(private store$:Store<appStateInterface>){
    this.members = this.store$.pipe(select(TeammatesSelector))
  }
  ngOnInit(): void {
    this.store$.dispatch(
      userAppActions.getTeammates()
    )
  }

}
