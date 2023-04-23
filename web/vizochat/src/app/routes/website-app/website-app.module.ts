import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteAppRoutingModule } from './website-app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { Err404Component } from './errors/err404/err404.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    LayoutComponent,
    Err404Component,
    HomeComponent
  ],
  imports: [
    CommonModule,
    WebsiteAppRoutingModule
  ]
})
export class WebsiteAppModule { }
