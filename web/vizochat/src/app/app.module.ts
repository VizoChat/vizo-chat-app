import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthAppModule } from './routes/auth-app/auth-app.module';

import { environment } from '../environments/environment';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthAppModule,
    RecaptchaV3Module,
    SocialLoginModule
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LfOReckAAAAACXsnogfSjWTCMf3PBwK6h7mURG-',//environment.recaptcha.siteKey,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '242662627798-etkjo95a6nila113nlgo7k055nu8tp69.apps.googleusercontent.com'
            )
          },
          
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
