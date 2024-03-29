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
  newTeammate(data:any):Observable<any>{
    return this.http.post(environment.baseApiUrl+'/newTeammate',data, this.httpOptions)
  }
  getTeammates():Observable<any>{
    return this.http.get(environment.baseApiUrl+'/getTeammates', this.httpOptions)
  }
  editChannelMembers(data:{teammate_id:string,channel_id:string},mode:'Push'|'Pull'):Observable<any>{
    return this.http.put(environment.baseApiUrl+'/editChannelMember'+mode, data, this.httpOptions)
  }
  getChatRooms(data?:any):Observable<any>{
    return this.http.post(environment.baseApiUrl+'/getChatRooms',data?data:{}, this.httpOptions)
  }
  getChats(data:any):Observable<any>{
    return this.http.post(environment.baseApiUrl+'/getChats',data, this.httpOptions)
  }
  sentImage(data:any):Observable<any>{
    let httpOptions = {
      headers:new HttpHeaders({
        'content-type':'multipart/form-data'
      })
    }
    
    return this.http.post(environment.baseApiUrl+'/sentImageMessage',data, httpOptions)
  }
  updateProfile(data:any):Observable<any>{
    return this.http.post(environment.baseApiUrl+'/updateUserProfile',data, this.httpOptions)
  }
  updateProfileAvatar(data:any):Observable<any>{
    let httpOptions = {
      headers:new HttpHeaders({
        'content-type':'multipart/form-data'
      })
    }
    return this.http.post(environment.baseApiUrl+'/setAvatar',data, httpOptions)
  }
}
