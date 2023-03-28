import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Err404Component } from './errors/err404/err404.component';
import { LayoutComponent } from './layout/layout.component';
import { ChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    {path:'', component:HomeComponent},
    {path:'profile', component:ProfileComponent},
    {path:'chat', component:ChatComponent},
    {path:'manage', loadChildren:()=>import('./pages/settings/settings.module').then(m=>m.SettingsModule)},
    {path:'**', component:Err404Component},
  ], canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAppRoutingModule { }
