import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/shared/services/auth.service';
import { select, Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/models/appState.interface';
import { errorSelector, isLoadingSelector, successSelector } from '../../store/selectors';
import { Observable, Subscription } from 'rxjs';
import * as AuthActions from '../../store/actions'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
  
  user: SocialUser | undefined;
  gAuthSubsciption!:Subscription;

  constructor(private api:ApiService, private authService: SocialAuthService, private authservice:AuthService, private store:Store<appStateInterface>){
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.isLogged$ = this.store.pipe(select(successSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }
  ngOnInit(): void {
    this.gAuthSubsciption = this.authService.authState.subscribe((user) => {
      this.user = user;
      let loggedin = (user !=null) ;
      if(loggedin){
        this.store.dispatch(
          AuthActions.doGSignup({ formData: {token:this.user.idToken}})
        )
      }
    });


    this.formData = new FormGroup({
      username: new FormControl(null),
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      repassword: new FormControl(null),
    })
  }
  
  formData:any;
  isLoading$!:Observable<Boolean>;
  isLogged$!:Observable<Boolean>;
  error$!:Observable<String | null>;
  
  signupSubmit(){
    if (this.formData.invalid) return;
    this.store.dispatch(
      AuthActions.doSignup({ formData: this.formData.value })
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
    if (this.gAuthSubsciption) this.gAuthSubsciption.unsubscribe();
  }
}
