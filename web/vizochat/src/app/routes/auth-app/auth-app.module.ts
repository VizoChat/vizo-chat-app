import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AuthAppRoutingModule } from './auth-app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ApiService } from './services/api.service';
import { RecaptchaInterceptor } from './recaptcha.interceptor';
import { GoogleSigninButtDirective } from './directives/google-signin-butt.directive';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    GoogleSigninButtDirective
  ],
  imports: [
    CommonModule,
    AuthAppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers:[
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: RecaptchaInterceptor, multi: true }  
  ]
})
export class AuthAppModule { }
