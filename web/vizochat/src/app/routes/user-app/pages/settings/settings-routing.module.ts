import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './child-pages/channels/add/add.component';
import { ChannelsComponent } from './child-pages/channels/channels.component';
import { SettingsComponent } from './child-pages/layout/settings.component';

const routes: Routes = [
  {path:'',component:SettingsComponent, children:[
    {path:'channels',component:ChannelsComponent,children:[
        {path:'new',component:AddComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
