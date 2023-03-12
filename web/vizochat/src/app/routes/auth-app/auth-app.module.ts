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
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { authEffects } from './store/effects';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    GoogleSigninButtDirective,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AuthAppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('authentication', reducer),
    EffectsModule.forFeature([authEffects])
  ],
  providers:[
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: RecaptchaInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '242662627798-etkjo95a6nila113nlgo7k055nu8tp69.apps.googleusercontent.com',
              {
                prompt: 'select_account',
                oneTapEnabled: false // Disable Google One-tap feature
              }
            )
          },
          
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AuthAppModule { }
