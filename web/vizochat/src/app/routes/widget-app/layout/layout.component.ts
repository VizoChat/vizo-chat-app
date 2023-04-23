import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { errorSelector, isPageLoadingSelector, successSelector } from '../store/selectors';
import * as widgetActions from '../store/actions'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{
  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if(event.data.type=='USERINFO'){
      this.currentUrl = event.data.data.currentPage;
      
      this.store$.dispatch(
        widgetActions.newWUser({data:{...this.params,current_Page:this.currentUrl}})
      )
    }
  }
  currentUrl!:string;
  successMsg$!:Observable<string | null>
  showTopLoader$!:Observable<boolean|null>
  params:any = {}
  
  constructor( private _snackBar: MatSnackBar, private store$:Store<appStateInterface>, private routes:ActivatedRoute){}
  ngOnInit(): void {
    this.showTopLoader$ = this.store$.pipe(select(isPageLoadingSelector))
    this.successMsg$ = this.store$.pipe(select(successSelector))
    this.successMsg$.subscribe(successMsg => {
      this.openSnack('Success',successMsg);
    });
    this.successMsg$ = this.store$.pipe(select(errorSelector))
    this.successMsg$.subscribe(successMsg => {
      this.openSnack('Danger',successMsg);
    });
    this.routes.snapshot.queryParamMap.keys.forEach((key:any) => {
      this.params[key] = this.routes.snapshot.queryParamMap.get(key);
    });
    
    this.store$.dispatch(
      widgetActions.newWUser({data:{...this.params,current_Page:this.currentUrl}})
    )
    this.store$.dispatch(
      widgetActions.getChatRooms({data:this.params})
    )

  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnack(type:'Danger'|'Success',successMsg:string|null){
    if(successMsg){
      this._snackBar.open(successMsg, 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:5000,
        panelClass:['snackBar'+type]
      });
      if(type=='Success'){
        this.store$.dispatch(
          widgetActions.clearSuccessMsg()
        )
      }else{
        this.store$.dispatch(
           widgetActions.clearErrorMsg()
        )
      }
    }
      
  }
}
