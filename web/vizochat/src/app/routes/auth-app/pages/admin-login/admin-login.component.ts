import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import * as AuthActions from '../../store/actions'
import { errorSelector, isLoadingSelector, successSelector } from '../../store/selectors';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy{
  formData!:any;
  ngOnInit(): void {
    this.formData = new FormGroup({
      user:new FormControl(null, [Validators.required]) ,
      password:new FormControl(null, [Validators.required]),
    })
  }

  isLoading$!:Observable<Boolean>;
  isLogged$!:Observable<Boolean>;
  error$!:Observable<String | null>;
  alert:any;
  loader = {
    loginBTN:false
  }
  constructor( private store:Store<appStateInterface>){
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.isLogged$ = this.store.pipe(select(successSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }
  formSubmit(){
    if (this.formData.invalid) return;
    this.store.dispatch(
      AuthActions.doLogin({ formData: this.formData.value, isUser:false })
    )

  }
  clearAlert(){
    this.store.dispatch(
      AuthActions.doLoginFailureClear()
    )
  }
  ngOnDestroy(): void {
    this.store.dispatch(
      AuthActions.doLoginFailureClear()
    )
  }

}
