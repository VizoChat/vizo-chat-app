import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { clearErrorMsg, clearSuccessMsg } from '../store/actions';
import { successMssgSelector, errorSelector,isContentLoadingSelector } from '../store/selectors';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  successMsg$!:Observable<string | null>
  showTopLoader$!:Observable<boolean|null>

  constructor( private _snackBar: MatSnackBar, private store$:Store<appStateInterface>){}
  ngOnInit(): void {
    this.showTopLoader$ = this.store$.pipe(select(isContentLoadingSelector))
    this.successMsg$ = this.store$.pipe(select(successMssgSelector))
    this.successMsg$.subscribe(successMsg => {
      this.openSnack('Success',successMsg);
    });
    this.successMsg$ = this.store$.pipe(select(errorSelector))
    this.successMsg$.subscribe(successMsg => {
      this.openSnack('Danger',successMsg);
    });
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnack(type:'Danger'|'Success',successMsg:string|null){
    if(successMsg)
    this._snackBar.open(successMsg, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:5000,
      panelClass:['snackBar'+type]
    });
    if(type=='Success'){
      this.store$.dispatch(
        clearSuccessMsg()
      )
    }else{
      this.store$.dispatch(
        clearErrorMsg()
      )
    }
  }
}
