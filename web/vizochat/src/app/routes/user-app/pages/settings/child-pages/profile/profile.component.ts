import { Component, OnDestroy, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { userDataSelector } from 'src/app/routes/user-app/store/selectors';
import { environment } from 'src/environments/environment';
import * as userAppActions from '../../../../store/actions'
import * as userAppSelector from '../../../../store/selectors'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  host: {
    'style': 'flex:1;'
  }
})
export class ProfileComponent implements OnInit, OnDestroy{
  userData!:any; 
  userDataSubscribe!:Subscription;
  inputShow = {
    nameInp:false,
    usernameInp:false,
  }
  dataToUpdate:string[] = []
  isLoading$!:Observable<Boolean>;
  apiUrl = environment.baseApiUrl
  constructor(private store$:Store<appStateInterface>){}
  ngOnInit(): void {
    this.userDataSubscribe = this.store$.pipe(select(userDataSelector)).subscribe((data)=>this.userData = JSON.parse(JSON.stringify(data)))
    this.isLoading$ = this.store$.pipe(select(userAppSelector.isLoadingSelector))
  }
  ngOnDestroy(): void {
    this.userDataSubscribe.unsubscribe()
  }
  updateProfile(formData:NgForm){
    let dataUpdated:any = {}
    this.dataToUpdate.forEach((name)=>{if(formData.value[name])dataUpdated[name] = formData.value[name]})
    this.store$.dispatch(
      userAppActions.updateUserProfile({newProfile:dataUpdated})
    )
    this.dataToUpdate = []
  }
  updateAvatar(img:any){
    let formData = new FormData
    formData.append('userAvatar',img.target.files[0])
    this.store$.dispatch(
      userAppActions.updateUserAvatar({avatarForm: formData})
    )
  }

}
