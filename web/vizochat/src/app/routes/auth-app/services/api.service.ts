import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GlobalserviceService } from 'src/app/services/globalservice.service';

@Injectable({
  providedIn: 'platform'
})
export class ApiService {

  constructor(private http:HttpClient, private globalServices:GlobalserviceService) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  doLogin(data:any):Observable<any>{
    return this.http.post(`${this.globalServices.apiUrl}/auth/login`, data, this.httpOptions)
  }
  doSignup(data:any):Observable<any>{
    return this.http.post(`${this.globalServices.apiUrl}/auth/signup`, data, this.httpOptions)
  }
  doGAUTHSignup(data:any):Observable<any>{
    return this.http.post(`${this.globalServices.apiUrl}/auth/google-signup`, data, this.httpOptions)
  }
  doGAUTHSignin(data:any):Observable<any>{
    return this.http.post(`${this.globalServices.apiUrl}/auth/google-signin`, data, this.httpOptions)
  }
  doAdminSignin(data:any):Observable<any>{
    return this.http.post(`${this.globalServices.apiUrl}/auth/admin`, data, this.httpOptions)
  }
}
