import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent as AddChannel } from './child-pages/channels/add/add.component';
import { AddComponent as AddTeammate} from './child-pages/teammates/add/add.component';
import { ChannelsComponent } from './child-pages/channels/channels.component';
import { DeleteComponent } from './child-pages/channels/edit/delete/delete.component';
import { EditComponent } from './child-pages/channels/edit/edit.component';
import { InstallationComponent } from './child-pages/channels/edit/installation/installation.component';
import { OverviewComponent } from './child-pages/channels/edit/overview/overview.component';
import { SettingsComponent } from './child-pages/layout/settings.component';
import { TeammatesComponent } from './child-pages/teammates/teammates.component';

const routes: Routes = [
  {path:'',component:SettingsComponent, children:[
    {path:'channels',component:ChannelsComponent,children:[
        {path:'new',component:AddChannel},
        {path:'edit/:channelID',component:EditComponent, children:[
          {path:'overview', component:OverviewComponent},
          {path:'installation', component:InstallationComponent},
          {path:'delete', component:DeleteComponent},
        ]}
    ]},
    {path:'teammates', component:TeammatesComponent, children:[
      {path:'new',component:AddTeammate},
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
