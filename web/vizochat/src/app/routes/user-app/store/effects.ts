import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs";
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
                    })
                )
            })
        )
    )
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwYWI5YTZiZmEzYjA5MDQ1ZWY0YWMiLCJ1c2VybmFtZSI6ImFkZGV2X2Nvbm5lY3RfNGpmZWRsIiwiaWF0IjoxNjc4ODQ5ODYzLCJleHAiOjE2Nzg4NTA3NjN9.ciVXO_g4tWYEWX20SZe1ukTDTPXi7ITRyis5_bkXiE4