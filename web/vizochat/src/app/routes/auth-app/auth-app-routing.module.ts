import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  
  {path:'', redirectTo:'/auth/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'admin', component:AdminLoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'**', redirectTo:'/err/404', pathMatch:'prefix'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthAppRoutingModule { }
