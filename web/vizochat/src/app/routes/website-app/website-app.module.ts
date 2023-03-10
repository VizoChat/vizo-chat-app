import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteAppRoutingModule } from './website-app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { Err404Component } from './errors/err404/err404.component';


@NgModule({
  declarations: [
    LayoutComponent,
    Err404Component
  ],
  imports: [
    CommonModule,
    WebsiteAppRoutingModule
  ]
})
export class WebsiteAppModule { }
