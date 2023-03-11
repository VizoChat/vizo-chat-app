import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private authService: SocialAuthService) { }

  authValidate(){
    if( localStorage.getItem('actoken') && localStorage.getItem('retoken') ){
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
  authOut(){
    this.router.navigate(['/auth/login']);
    localStorage.clear()
    this.authService.signOut()
  }
}
