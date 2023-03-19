import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InitPageComponent } from './pages/init-page/init-page.component'
import { ChatPageComponent } from './pages/chat-page/chat-page.component'

const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    {path:'', component: InitPageComponent},
    {path:'chat/:chatId', component: ChatPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetAppRoutingModule { }
