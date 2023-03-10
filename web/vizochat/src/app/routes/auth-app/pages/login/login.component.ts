import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private api:ApiService){}
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
