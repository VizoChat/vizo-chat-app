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
  editChannel(data:{channelName:String|null|undefined, channelDomain:String|null|undefined}):Observable<any>{
    return this.http.put(environment.baseApiUrl+'/editChannel',data, this.httpOptions)
  }
  getChannels():Observable<any>{
    return this.http.get(environment.baseApiUrl+'/getChannels', this.httpOptions)
  }
  delChannel(data:{channel_id:String|null|undefined}):Observable<any>{
    let httpOptions = JSON.parse(JSON.stringify(this.httpOptions)); 
    httpOptions.body = data
    return this.http.delete(environment.baseApiUrl+'/delChannel', httpOptions)
  }
  getChatRoms(data?:any):Observable<any>{
    return this.http.post(environment.baseApiUrl+'/getChatRooms',data?data:{}, this.httpOptions)
  }
}
