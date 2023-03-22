import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './child-pages/channels/add/add.component';
import { ChannelsComponent } from './child-pages/channels/channels.component';
import { DeleteComponent } from './child-pages/channels/edit/delete/delete.component';
import { EditComponent } from './child-pages/channels/edit/edit.component';
import { InstallationComponent } from './child-pages/channels/edit/installation/installation.component';
import { OverviewComponent } from './child-pages/channels/edit/overview/overview.component';
import { SettingsComponent } from './child-pages/layout/settings.component';

const routes: Routes = [
  {path:'',component:SettingsComponent, children:[
    {path:'channels',component:ChannelsComponent,children:[
        {path:'new',component:AddComponent},
        {path:'edit/:channelID',component:EditComponent, children:[
          {path:'overview', component:OverviewComponent},
          {path:'installation', component:InstallationComponent},
          {path:'delete', component:DeleteComponent},
        ]}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
