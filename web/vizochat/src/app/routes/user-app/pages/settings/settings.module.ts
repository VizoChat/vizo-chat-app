import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './child-pages/layout/settings.component';
import { ChannelsComponent } from './child-pages/channels/channels.component';
import { AddComponent } from './child-pages/channels/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';


@NgModule({
  declarations: [
    SettingsComponent,
    ChannelsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SettingsModule { }
