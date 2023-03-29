import {  Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { teammateForm } from 'src/app/routes/user-app/models/teammates.interface';
import * as userAppActions from 'src/app/routes/user-app/store/actions'
import { isLoadingSelector } from 'src/app/routes/user-app/store/selectors';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  formData!:any;
  isLoading$!:Observable<boolean>;
  constructor(private store$:Store<appStateInterface>, ){
    this.isLoading$ = this.store$.pipe(select(isLoadingSelector))
    this.formData = new FormGroup({
      name:new FormControl(null),
      email:new FormControl(null),
      password:new FormControl(null),
      repassword:new FormControl(null),
    })
  }
  
  onsubmit(){
    if(this.formData.invalid)return ;
    this.store$.dispatch(
      userAppActions.newTeammate(this.formData.value)
    )
  }
  _show_hide_password:Boolean = false;
  show_hide_password(){
    this._show_hide_password = !this._show_hide_password 
  }
}
