import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      let loggedin = (user !=null) ;
      if(loggedin){
        
        this.loader.loginBTN = true;
        
        this.api.doGAUTHSignin({'token':this.user.idToken}).subscribe((data)=>{
        this.loader.loginBTN = false;
        console.log(data);
          if(data.status=='ok'){
            this.alert = {
              error:false,
              message:data.message
            }
            this.authservice.setToken({acToken:data.data.token.accessToken,reToken:data.data.token.refreshToken})
          }else{
            this.authService.signOut()
            this.alert = {
              error:true,
              message:data.message
            }
          }
          
        })
      }
    });
  }
  constructor(private api:ApiService, private authService: SocialAuthService, private authservice:AuthService){}
  user: SocialUser | undefined;
  formData = new FormGroup({
    user:new FormControl(null),
    password:new FormControl(null),
  })
  alert:any;
  loader = {
    loginBTN:false
  }
  loginSubmit(){
    this.loader.loginBTN = true;
    this.api.doLogin(this.formData.value).subscribe((data)=>{
      this.loader.loginBTN = false;

      if(data.status=='ok'){
        this.alert = {
          error:false,
          message:data.message
        }
        this.authservice.setToken({acToken:data.data.token.accessToken,reToken:data.data.token.refreshToken})

      }else{
        this.alert = {
          error:true,
          message:data.message
        }
      }
      console.log(data);
      
    })
  }
  clearAlert(){
    this.alert = {}
  }
}
