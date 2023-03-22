import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { ApiService } from 'src/app/routes/user-app/services/api.service';
import { isLoadingSelector, successMssgSelector } from 'src/app/routes/user-app/store/selectors';
import * as channelActions from '../../../../../store/actions'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  constructor( private store$:Store<appStateInterface>, private routes:Router){}
  isLoading$!:Observable<boolean>;
  successMsg$!:Observable<string|null>;
  
  ngOnInit(): void {
    this.formData = new FormGroup({
      channelName:new FormControl(null),
      channelDomain:new FormControl(null)
    })
    this.isLoading$ = this.store$.pipe(select(isLoadingSelector))
    this.successMsg$ = this.store$.pipe(select(successMssgSelector))
    this.successMsg$.subscribe(successMsg => {
      if(successMsg){
        this.routes.navigate(['/app/manage/channels'])
        this.store$.dispatch(
          channelActions.getChannels()
        )
      }
    });
    
  }
  onsubmit(){
    if (this.formData.invalid) return;
    this.store$.dispatch(
      channelActions.newChannel(this.formData.value)
    )
    

  }
  formData:any;
}
