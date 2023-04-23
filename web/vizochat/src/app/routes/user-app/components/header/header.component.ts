import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { isPageLoadingSelector } from '../../store/selectors'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  pageLoading$:Observable<Boolean>;
  notification_show = 'false';
  constructor(private authservice:AuthService, private router:Router, private store:Store<appStateInterface>){
    this.pageLoading$ = this.store.pipe(select(isPageLoadingSelector))
  }
  logout(){
    this.authservice.authOut();
    this.router.navigate(['/auth/login'])
  }
}
