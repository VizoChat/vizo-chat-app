import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private api:ApiService){}
  formData = new FormGroup({
    user:new FormControl(null),
    password:new FormControl(null),
  })

  formSubmit(){
    this.api.doAdminSignin(this.formData.value).subscribe((data)=>{
      console.log(data);
      
    })
  }

}
