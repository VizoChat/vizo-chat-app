import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetAppRoutingModule } from './widget-app-routing.module';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { InitPageComponent } from './pages/init-page/init-page.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { widgetAppEffects } from './store/effects';
import { reducer } from './store/reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatPageComponent,
    InitPageComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WidgetAppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('widget', reducer),
    EffectsModule.forFeature([widgetAppEffects]),
  ]
})
export class WidgetAppModule { }
