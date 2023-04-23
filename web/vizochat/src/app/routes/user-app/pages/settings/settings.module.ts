import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './child-pages/layout/settings.component';
import { ChannelsComponent } from './child-pages/channels/channels.component';
import { AddComponent as AddChannel } from './child-pages/channels/add/add.component';
import { AddComponent as AddTeammate} from './child-pages/teammates/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { EditComponent as EditChannel} from './child-pages/channels/edit/edit.component';
import { OverviewComponent as ChannelEditOverview } from './child-pages/channels/edit/overview/overview.component';
import { OverviewComponent as teammateEditOverview } from './child-pages/teammates/edit/overview/overview.component';
import { InstallationComponent } from './child-pages/channels/edit/installation/installation.component';
import { DeleteComponent } from './child-pages/channels/edit/delete/delete.component';
import { TeammatesComponent } from './child-pages/teammates/teammates.component';
import { EditComponent as EditTeammate } from './child-pages/teammates/edit/edit.component';
import { MembersComponent } from './child-pages/channels/edit/members/members.component';
import { ProfileComponent } from './child-pages/profile/profile.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ChannelsComponent,
    AddChannel,
    EditChannel,
    ChannelEditOverview,
    InstallationComponent,
    DeleteComponent,
    TeammatesComponent,
    AddTeammate,
    EditTeammate,
    teammateEditOverview,
    MembersComponent,
    ProfileComponent
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
