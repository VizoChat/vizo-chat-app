import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetAppRoutingModule } from './widget-app-routing.module';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { InitPageComponent } from './pages/init-page/init-page.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';


@NgModule({
  declarations: [
    ChatPageComponent,
    InitPageComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WidgetAppRoutingModule,
    SharedModule
  ]
})
export class WidgetAppModule { }
