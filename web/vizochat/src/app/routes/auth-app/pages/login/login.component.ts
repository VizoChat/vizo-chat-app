import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as AuthActions from "../../store/actions"
import { ApiService } from '../../services/api.service';
import { Observable, Subscription } from 'rxjs';
import { errorSelector, isLoadingSelector, successSelector } from '../../store/selectors';
import { appStateInterface } from 'src/app/models/appState.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  gAuthSubsciption!:Subscription;
  ngOnInit(): void {
    this.gAuthSubsciption = this.authService.authState.subscribe((user) => {
      this.user = user;
      let loggedin = (user !=null) ;
      if(loggedin){
        this.store.dispatch(
          AuthActions.doGLogin({ formData: {token:this.user.idToken}})
        )
      }
    });

    this.formData = new FormGroup({
      user:new FormControl(null),
      password:new FormControl(null),
    })
  }
  formData:any;
  isLoading$!:Observable<Boolean>;
  isLogged$!:Observable<Boolean>;
  error$!:Observable<String | null>;
  constructor(private api:ApiService, private authService: SocialAuthService, private authservice:AuthService, private store:Store<appStateInterface>){
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.isLogged$ = this.store.pipe(select(successSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }
  user: SocialUser | undefined;
  
  
  loginSubmit(){
    if (this.formData.invalid) return;
    this.store.dispatch(
      AuthActions.doLogin({ formData: this.formData.value, isUser:true })
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
