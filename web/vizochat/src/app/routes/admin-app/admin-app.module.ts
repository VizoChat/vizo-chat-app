import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAppRoutingModule } from './admin-app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { Err404Component } from './errors/err404/err404.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    HomeComponent,
    Err404Component,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminAppRoutingModule
  ]
})
export class AdminAppModule {
  
 }
