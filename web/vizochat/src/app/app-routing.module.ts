import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Err404Component } from './routes/website-app/errors/err404/err404.component';
import { LayoutComponent } from './routes/website-app/layout/layout.component';

const routes: Routes = [
  {path:'', loadChildren:()=>import('./routes/website-app/website-app.module').then(m=>m.WebsiteAppModule)},
  {path:'widget', loadChildren:()=>import('./routes/widget-app/widget-app.module').then(m=>m.WidgetAppModule)},
  {path:'app', loadChildren:()=>import('./routes/user-app/user-app.module').then(m=>m.UserAppModule)},
  {path:'auth', loadChildren:()=>import('./routes/auth-app/auth-app.module').then(m=>m.AuthAppModule)},
  {path:'admin', loadChildren:()=>import('./routes/admin-app/admin-app.module').then(m=>m.AdminAppModule)},
  {path:'**', component:LayoutComponent, children:[
    {path:'', component:Err404Component}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
