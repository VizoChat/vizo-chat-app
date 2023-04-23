import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InitPageComponent } from './pages/init-page/init-page.component'
import { ChatPageComponent } from './pages/chat-page/chat-page.component'

const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    {path:':channelid', component: InitPageComponent},
    {path:':channelid/chat/:chatId/:ds_key/:userId', component: ChatPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetAppRoutingModule { }
