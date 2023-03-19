import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { ApiService } from "../services/api.service"; 
import * as UserAppActions from './actions'

@Injectable()
export class userAppEffects {
    constructor(private action$:Actions, private api:ApiService, private authService:AuthService, private store:Store){}
    getUser$ = createEffect(()=>
        this.action$.pipe(
            ofType(UserAppActions.getUser),
            mergeMap(()=>{
                return this.api
                .getUserData()
                .pipe(
                    map((data)=>{
                        
                        if(data.status=='ok'  && data.authorization==true){
                            return UserAppActions.gotUser({user:data.data.userData})
                        }else{
                            this.authService.refreshAccessToken('user',()=>{
                                this.store.dispatch(
                                    UserAppActions.getUser()
                                )
                            })
                            return UserAppActions.errorGettingUser({error:data.message})
                        }
                    }),
                    catchError((err:any)=>
                        of( UserAppActions.errorGettingUser({error:'Something went wrong!'}))
                    )  
                )
            })
        )
    )


    $newChannel = createEffect(()=>{
        return this.action$.pipe(
            ofType(UserAppActions.newChannel),
            mergeMap((action:any)=>{
                return this.api
                .newChannel(action)
                .pipe(
                    map((data)=>{
                        if(data.status=='ok'  && data.authorization==true){
                            return UserAppActions.createdChannel({successMessage:data.message})
                        }else{
                            return UserAppActions.errorChannel({errorMessage:data.message})
                        }
                    }),
                    catchError((err)=>{
                        return of(UserAppActions.errorChannel({errorMessage:'Something went wrong!'}))
                    })
                )
            })
        )
    })
}