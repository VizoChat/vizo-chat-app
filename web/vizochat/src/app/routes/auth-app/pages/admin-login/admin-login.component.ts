import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private api:ApiService, private authservice:AuthService){}
  formData = new FormGroup({
    user:new FormControl(null),
    password:new FormControl(null),
  })
  alert:any;
  loader = {
    loginBTN:false
  }
  formSubmit(){
    this.loader.loginBTN = true;
    this.api.doAdminSignin(this.formData.value).subscribe((data)=>{
      this.loader.loginBTN = false;
      console.log(data);
      if(data.status=='ok'){
        this.alert = {
          error:false,
          message:data.message
        }
        this.authservice.setAdminToken({acToken:data.data.token.accessToken,reToken:data.data.token.refreshToken})

      }else{
        this.alert = {
          error:true,
          message:data.message
        }
      }
      
    })
  }
  clearAlert(){
    this.alert = {}
  }

}
