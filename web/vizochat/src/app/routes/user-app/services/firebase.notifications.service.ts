import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Injectable({
  providedIn: 'root'
})
export class FirebaseNotificationsService {

  message:any = null;
  constructor() {
    initializeApp(environment.firebase.firebaseConfig);
  }
  initFirebaseNotification(): void {
    this.requestPermission();
    this.listen();
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.credentials.WPCkeyPair}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
}
