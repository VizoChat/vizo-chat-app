import { Component, Input } from '@angular/core';
import { FirebaseNotificationsService } from '../../services/firebase.notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input('show') show!:string;
  message:any;
  constructor(private fireNotification:FirebaseNotificationsService){
    this.fireNotification.initFirebaseNotification()
    this.message = this.fireNotification.message
  }

}
