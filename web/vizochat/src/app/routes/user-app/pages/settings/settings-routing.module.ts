import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent as AddChannel } from './child-pages/channels/add/add.component';
import { AddComponent as AddTeammate} from './child-pages/teammates/add/add.component';
import { ChannelsComponent } from './child-pages/channels/channels.component';
import { DeleteComponent } from './child-pages/channels/edit/delete/delete.component';
import { EditComponent as EditChannel} from './child-pages/channels/edit/edit.component';
import { EditComponent as EditTeammate} from './child-pages/teammates/edit/edit.component';
import { InstallationComponent } from './child-pages/channels/edit/installation/installation.component';
import { OverviewComponent as ChannelEditOverview } from './child-pages/channels/edit/overview/overview.component';
import { OverviewComponent as teammateEditOverview } from './child-pages/teammates/edit/overview/overview.component';
import { SettingsComponent } from './child-pages/layout/settings.component';
import { TeammatesComponent } from './child-pages/teammates/teammates.component';
import { MembersComponent } from './child-pages/channels/edit/members/members.component';

const routes: Routes = [
  {path:'',component:SettingsComponent, children:[
    {path:'channels',component:ChannelsComponent,children:[
        {path:'new',component:AddChannel},
        {path:'edit/:channelID',component:EditChannel, children:[
          {path:'overview', component:ChannelEditOverview},
          {path:'members', component:MembersComponent},
          {path:'installation', component:InstallationComponent},
          {path:'delete', component:DeleteComponent},
        ]}
    ]},
    {path:'teammates', component:TeammatesComponent, children:[
      {path:'new',component:AddTeammate},
      {path:'edit/:userId',component:EditTeammate, children:[
        {path:'overview', component:teammateEditOverview}
      ]},
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
