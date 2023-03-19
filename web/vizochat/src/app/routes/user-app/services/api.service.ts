import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'platform'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  httpOptions = {
    headers:new HttpHeaders({
      'content-type':'application/json'
    })
  }
  getUserData():Observable<any>{
    return this.http.get(environment.baseApiUrl+'/userdata', this.httpOptions)
  }
  newChannel(data:{channelName:String|null, channelDomain:String|null}):Observable<any>{
    return this.http.put(environment.baseApiUrl+'/newChannel',data, this.httpOptions)
  }
}
