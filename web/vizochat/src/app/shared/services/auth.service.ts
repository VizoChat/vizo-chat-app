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
    this.userSettimeout = null;
    await this.authService.signOut()
    // this.router.navigate(['/auth/login']); //auth guard will do this...
  }
  private userSettimeout:any;
  startSessTimout(user:string){
    let actokenName = (user=='user')?'actoken':'adminActoken';
    let authValidate = (user=='user')?this.authValidate():this.adminAuthValidate();
    
    if(authValidate){ 
      try {
        
        let acToken:any = localStorage.getItem(actokenName)
        let timeoutAC = ((JSON.parse(atob(acToken.split('.')[1]))).exp* 1000)-Date.now() ;
        
        if(timeoutAC>120641){//before 2 min
          this.userSettimeout = setTimeout(() => {
            this.refreshAccessToken(user);
          }, timeoutAC);
        }else{
          this.refreshAccessToken(user);
        }
      } catch (error) {
        this.authOut()
      }
    }
  }
  callbackCount=0
  refreshAccessToken(user:string,callback?:any){
    let retokenName = (user=='user')?'retoken':'adminRetoken';
    let actokenName = (user=='user')?'actoken':'adminActoken';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem(retokenName)
      })
    }
    
    this.http.get(`${this.globalServices.apiUrl}/auth/generate-token`, httpOptions).subscribe((data:any)=>{
      console.log(data);
      if(data.status=='ok' && data.authorization==true){
        localStorage.setItem(actokenName,data.data.token.accessToken)
        this.startSessTimout(user)
        if(callback&&(this.callbackCount<=1)){
          this.callbackCount++
          callback()
        }
      }else{
        this.authOut()
      }
    })
  }
}
