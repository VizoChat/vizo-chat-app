import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { ApiService } from "../services/api.service";
import * as authActions from './actions'

@Injectable()
export class authEffects  {
    doLogin$ = createEffect(()=>
        this.actions$.pipe(
            ofType(authActions.doLogin),
            mergeMap((action)=>{
                if(action.isUser){
                    return this.apiService
                    .doLogin(action.formData)
                    .pipe(map((data)=>{
                        if(data.status=='ok'){
                            this.authservice.setToken({acToken:data.data.token.accessToken,reToken:data.data.token.refreshToken})
                            return authActions.doLoginSuccess()
                        }else{
                            return authActions.doLoginFailure({error:data.message})
                        }
                    }),
                        catchError(error=>
                            of(authActions.doLoginFailure({error}))
                        )
                    )
                }else {
                    return this.apiService
                    .doAdminSignin(action.formData)
                    .pipe(map((data)=>{
                        if(data.status=='ok'){
                            this.authservice.setAdminToken({acToken:data.data.token.accessToken,reToken:data.data.token.refreshToken})
                            return authActions.doLoginSuccess()
                        }else{
                            return authActions.doLoginFailure({error:data.message})
                        }
                    }),
                        catchError(error=>
                            of(authActions.doLoginFailure({error}))
                        )
                    )
                }
                
            })
        )
    )
    doGLogin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(authActions.doGLogin),
            mergeMap((action)=>{
                return this.apiService
                .doGAUTHSignin(action.formData)
                .pipe(map(
                    (data)=>{
                        if(data.status=='ok'){
                            this.authservice.setToken({acToken:data.data.token.accessToken,reToken:data.data.token.refreshToken})
                            return authActions.doLoginSuccess()
                        }else{
                            return authActions.doLoginFailure({error:data.message})
                        }
                    }),
                    catchError(error=>
                        of(authActions.doLoginFailure({error}))
                    )
                )
            })
        )
    })
    doSignup$ = createEffect(()=>
    this.actions$.pipe(
        ofType(authActions.doSignup),
        mergeMap((action)=>
            this.apiService
            .doSignup(action.formData)
            .pipe(map(
                (data)=>{
                    if(data.status=='ok'){
                        this.authservice.setToken({acToken:data.data.token.accessToken,reToken:data.data.token.refreshToken})
                        return authActions.doLoginSuccess()
                    }else{
                        return authActions.doLoginFailure({error:data.message})
                    }
                }),
                catchError(error=>
                    of(authActions.doLoginFailure({error}))
                )
            )
        )
    ))
    doGSignup$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(authActions.doGSignup),
            mergeMap((action)=>{
                return this.apiService
                .doGAUTHSignup(action.formData)
                .pipe(map(
                    (data)=>{
                        if(data.status=='ok'){
                            this.authservice.setToken({acToken:data.data.token.accessToken,reToken:data.data.token.refreshToken})
                            return authActions.doLoginSuccess()
                        }else{
                            return authActions.doLoginFailure({error:data.message})
                        }
                    }),
                    catchError(error=>
                        of(authActions.doLoginFailure({error}))
                    )
                )
            })
        )
    })
    constructor(private actions$:Actions, private apiService:ApiService, private authservice:AuthService){}
}