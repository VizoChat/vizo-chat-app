import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalserviceService } from './globalservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private authService: SocialAuthService, private http:HttpClient, private globalServices:GlobalserviceService) { }

  authValidate(){
    if( localStorage.getItem('actoken') && localStorage.getItem('retoken') ){
      return true
    }
    this.router.navigate(['/auth/login']); //can be removed, mostly used in authguard!
    return false
  }
  adminAuthValidate(){
    if( localStorage.getItem('adminActoken') && localStorage.getItem('adminRetoken') ){
      return true
    }
    this.router.navigate(['/auth/login']); //can be removed, mostly used in authguard!
    return false
  }
  setToken(tokens:{acToken:string,reToken:string}){
    localStorage.setItem('actoken',tokens.acToken)
    localStorage.setItem('retoken',tokens.reToken)
    this.router.navigate(['/app']);
  }
  setAdminToken(tokens:{acToken:string,reToken:string}){
    localStorage.setItem('adminActoken',tokens.acToken)
    localStorage.setItem('adminRetoken',tokens.reToken)
    this.router.navigate(['/admin']);
  }
  async authOut(){
    localStorage.clear()
    await this.authService.signOut()
    // this.router.navigate(['/auth/login']); //cannot do this here
  }
  private adminSettimout:any;
  private userSettimeout:any;
  startSessTimout(){
    if(this.authValidate()){ 
      let acToken:any = localStorage.getItem('actoken')
      let timeoutAC = ((JSON.parse(atob(acToken.split('.')[1]))).exp* 1000)-Date.now() ;
      console.log(timeoutAC,'timeoutAC');
      console.log( Math.floor((timeoutAC/1000/60) << 0),':',Math.floor((timeoutAC/1000) % 60),'TIME');
      if(timeoutAC>1){
        this.userSettimeout = setTimeout(() => {
          console.log('sess expired');
          this.refreshAccessToken('user');
        }, timeoutAC);
      }else{
        console.log('already expired');
        this.refreshAccessToken('user');
      }
    }
  }
  refreshAccessToken(user:string){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    if(user=='user'){
      localStorage.setItem('actoken',localStorage.getItem('retoken')||'')
    }else if(user=='admin'){

    }
    this.http.get(`${this.globalServices.apiUrl}/auth/generate-token`, httpOptions).subscribe((data)=>{
      console.log(data);
      
    })
  }
}
