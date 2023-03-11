import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{


  constructor(private api:ApiService, private authService: SocialAuthService, private authservice:AuthService){}
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      let loggedin = (user !=null) ;
      if(loggedin){
        this.loader.signupBTN = true;
        
        this.api.doGAUTHSignup({'token':this.user.idToken}).subscribe((data)=>{
        this.loader.signupBTN = false;
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
  formData = new FormGroup({
    username: new FormControl(null),
    name: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    repassword: new FormControl(null),
  })
  alert:any;
  loader = {
    signupBTN:false
  }
  
  signupSubmit(){
    this.loader.signupBTN = true;
    this.api.doSignup(this.formData.value).subscribe((data)=>{
      this.loader.signupBTN = false;

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
      
    })
  }
  user: SocialUser | undefined;
  // signupWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, {
  //     scope: 'profile email'
  //   }).then((response) => {
  //     const token = response.idToken;
  //     console.log(token,'gtoken');
      
  //     // send the token to the server to create or log in the user
  //   }).catch((err)=>{
  //     console.error(err);
      
  //     this.alert = {
  //       error:true,
  //       message:err
  //     }
  //   })
  // }
  clearAlert(){
    this.alert = {}
  }
}
