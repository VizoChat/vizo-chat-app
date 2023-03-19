import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as userAppActions from './store/actions'

import { UserAppRoutingModule } from './user-app-routing.module';
import { Err404Component } from './errors/err404/err404.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from './interceptors/auth-header.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { reducer } from './store/reducer'; 
import { userAppEffects } from './store/effects'; 
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApiService } from './services/api.service';
import { ChatComponent } from './pages/chat/chat.component'; 
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';


@NgModule({
  declarations: [
    Err404Component,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    UserAppRoutingModule,
    StoreModule.forFeature('userApp', reducer),
    EffectsModule.forFeature([userAppEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
  ],
  
})
export class UserAppModule  { 
  constructor(private authService:AuthService, private store:Store){
    this.getUserData()
    this.authService.startSessTimout('user')
  }
  getUserData(){
    this.store.dispatch(
      userAppActions.getUser()
    )
    
  }
}
