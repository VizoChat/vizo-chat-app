import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

  constructor() { }
  public apiUrl = 'http://localhost:3000'
}
