import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private http_options = {
    headers:new HttpHeaders({
      'content-type':'application/json'
    })
  }
  getChatRooms(data:any):Observable<any>{
    return this.http.post(`${environment.baseApiUrl}/widget/getChatRooms`, data, this.http_options)
  }
  newChatRoom(data:any):Observable<any>{
    return this.http.post(`${environment.baseApiUrl}/widget/newChatRoom`, data, this.http_options)
  }
  getChats(data:{apiKey:string,chatId:string}):Observable<any>{ 
    return this.http.post(`${environment.baseApiUrl}/widget/getChats`, data, this.http_options)
  }
}
