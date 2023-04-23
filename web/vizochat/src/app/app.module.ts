import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PickerModule,
    BrowserModule,
    AppRoutingModule,
    RecaptchaV3Module,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey , 
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.socialAuth.googleKey,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
