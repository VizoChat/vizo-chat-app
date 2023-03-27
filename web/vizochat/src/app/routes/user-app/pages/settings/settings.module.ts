import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './child-pages/layout/settings.component';
import { ChannelsComponent } from './child-pages/channels/channels.component';
import { AddComponent as AddChannel } from './child-pages/channels/add/add.component';
import { AddComponent as AddTeammate} from './child-pages/teammates/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { EditComponent } from './child-pages/channels/edit/edit.component';
import { OverviewComponent } from './child-pages/channels/edit/overview/overview.component';
import { InstallationComponent } from './child-pages/channels/edit/installation/installation.component';
import { DeleteComponent } from './child-pages/channels/edit/delete/delete.component';
import { TeammatesComponent } from './child-pages/teammates/teammates.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ChannelsComponent,
    AddChannel,
    EditComponent,
    OverviewComponent,
    InstallationComponent,
    DeleteComponent,
    TeammatesComponent,
    AddTeammate
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class SettingsModule { }
