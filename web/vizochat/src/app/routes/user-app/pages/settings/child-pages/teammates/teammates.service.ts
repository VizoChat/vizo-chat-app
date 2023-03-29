import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { appStateInterface } from 'src/app/models/appState.interface';
import { teammates } from 'src/app/routes/user-app/models/teammates.interface';
import { TeammatesSelector } from 'src/app/routes/user-app/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class TeammatesService {
  teammates$!:Observable<teammates[] | undefined>;
  currentTeammate=new BehaviorSubject<any>(null);

  constructor(private store$:Store<appStateInterface>,private route:Router) {
    this.teammates$ = this.store$.pipe(select(TeammatesSelector))
   }
  setTeammateId(id:any){
    this.teammates$.subscribe((data)=>{
      let leng = data?.length;
      let tried_fail = 1
      data?.forEach((val,i)=>{
        if(val._id == id){
          this.setTeammate(val)
        } else {
          if(tried_fail==leng){
            this.route.navigate(['/app/manage/teammates'])//redirection at 404
          }
          tried_fail++;
        }
      })
      
    })
  }
  setTeammate(data:any){
    this.currentTeammate.next(data)
    
  }
  getTeammate():Observable<any>{
    return this.currentTeammate
  }
}
