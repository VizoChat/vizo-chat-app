import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { teammateForm } from 'src/app/routes/user-app/models/teammates.interface';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  formData!:any;
  constructor(){
    this.formData = new FormGroup({
      name:new FormControl(null),
      email:new FormControl(null),
      password:new FormControl(null),
      repassword:new FormControl(null),
    })
  }
  onsubmit(){
    
  }
  _show_shide_password:Boolean = false;
  show_shide_password(){
    this._show_shide_password = !this._show_shide_password 
  }
}
